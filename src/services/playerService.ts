import { MongoClient, ObjectId, Db } from "mongodb";
import { Player } from "../models/database/player";
import { HitPointStatus } from "../models/response/hitPointStatus";
import { DamageType } from "../enums/damageType";
import { DefenseType } from "../enums/defenseType";
import { PlayerNotFoundError } from "../errors/playerNotFound";
import { ValidationError } from "../errors/validationError";

const client = new MongoClient("mongodb://localhost:27017");
const dbName = "hp_api";

let database: Db | undefined;

async function connect() {
  if (!database) {
    await client.connect();
    database = client.db(dbName);
  }
  return database;
}

export class PlayerService {
  private async getPlayer(id: string): Promise<Player | null> {
    const db = await connect();
    const collection = db.collection<Player>("players");
    return collection.findOne({ id });
  }

  async damagePlayer(
    id: string,
    damageType: DamageType,
    damageAmount: number
  ): Promise<any> {
    if (damageAmount < 0) {
      throw new ValidationError("Damage must be non-negative");
    }

    const db = await connect();
    const collection = db.collection<Player>("players");

    const player = await this.getPlayer(id);
    if (!player) {
      throw new PlayerNotFoundError();
    }

    // Apply Defenses
    const playerDefense = player.defenses.find((d) => d.type === damageType);
    if (playerDefense) {
      switch (playerDefense.defense) {
        case DefenseType.Immunity:
          damageAmount = 0;
          break;
        case DefenseType.Resistance:
          damageAmount = Math.floor(damageAmount / 2);
          break;
      }
    }

    // Reduce temp hit points first
    if (player.state.tempHitPoints > 0) {
      const tmpDmg = Math.min(player.state.tempHitPoints, damageAmount);
      player.state.tempHitPoints -= tmpDmg;
      damageAmount -= tmpDmg;
    }

    // Reduce hit points
    player.state.hitPoints = Math.max(player.state.hitPoints - damageAmount, 0);

    await collection.updateOne(
      { id },
      {
        $set: {
          "state.hitPoints": player.state.hitPoints,
          "state.tempHitPoints": player.state.tempHitPoints,
        },
      }
    );

    return this.getPlayerHitPoints(id);
  }

  async getPlayerHitPoints(id: string): Promise<HitPointStatus> {
    const player = await this.getPlayer(id);
    if (!player) {
      throw new PlayerNotFoundError();
    }

    return {
      id,
      currentHP: player.state.hitPoints,
      maxHP: player.maxHitPoints,
      temporaryHP: player.state.tempHitPoints,
    };
  }

  async grantPlayerTemporaryHitPoints(
    id: string,
    amount: number
  ): Promise<HitPointStatus> {
    const db = await connect();
    const collection = db.collection<Player>("players");

    const player = await this.getPlayer(id);
    if (!player) {
      throw new PlayerNotFoundError();
    }

    player.state.tempHitPoints = Math.max(player.state.tempHitPoints, amount);

    await collection.updateOne(
      { id },
      {
        $set: {
          "state.tempHitPoints": player.state.tempHitPoints,
        },
      }
    );

    return this.getPlayerHitPoints(id);
  }

  async healPlayer(id: string, amount: number): Promise<HitPointStatus> {
    const db = await connect();
    const collection = db.collection<Player>("players");

    const player = await this.getPlayer(id);
    if (!player) {
      throw new PlayerNotFoundError();
    }

    // Only heal up to max HP
    player.state.hitPoints = Math.min(
      player.state.hitPoints + amount,
      player.maxHitPoints
    );

    await collection.updateOne(
      { id },
      {
        $set: {
          "state.hitPoints": player.state.hitPoints,
        },
      }
    );

    return this.getPlayerHitPoints(id);
  }
}
