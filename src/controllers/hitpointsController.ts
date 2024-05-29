import { Body, Controller, Example, Get, Patch, Route } from "tsoa";
import { PlayerService } from "../services/playerService";
import {
  HitPointStatus,
  hitPointStatusExample,
} from "../models/response/hitPointStatus";
import { DamageRequest } from "../models/request/damageRequest";
import { HealRequest } from "../models/request/healRequest";
import { TemporaryHPRequest } from "../models/request/temporaryHPRequest";

@Route("players")
export class HitpointsController extends Controller {
  private playerService: PlayerService;

  constructor() {
    super();
    this.playerService = new PlayerService();
  }

  /**
   * Applies damage to a player's hit points.
   *
   * This endpoint allows you to apply damage to a specified player, reducing their hit points based on the damage type and amount.
   * The endpoint handles player defenses (immunities and resistances) and adjusts the damage accordingly.
   *
   * @param playerId The ID of the player to damage.
   * @param damageReq An object containing the type of damage and the amount.
   * @returns The updated hit points status of the player.
   *
   * @example playerId "briv"
   * @example damageReq {
   *   "type": "bludgeoning",
   *   "amount": 10
   * }
   */
  @Example<HitPointStatus>(hitPointStatusExample)
  @Patch("{playerId}/hp/damage")
  public async damagePlayer(
    playerId: string,
    @Body() damageReq: DamageRequest
  ): Promise<HitPointStatus> {
    return this.playerService.damagePlayer(
      playerId,
      damageReq.type,
      damageReq.amount
    );
  }

  /**
   * Heals a player's hit points.
   *
   * This endpoint allows you to heal a specified player, increasing their hit points based on the amount provided.
   * The healing will not exceed the player's maximum hit points.
   *
   * @param playerId The ID of the player to heal.
   * @param healReq An object containing the amount to heal.
   * @returns The updated hit points status of the player.
   *
   * @example playerId "briv"
   * @example healReq {
   *   "amount": 15
   * }
   */
  @Example<HitPointStatus>(hitPointStatusExample)
  @Patch("{playerId}/hp/heal")
  public async healPlayer(
    playerId: string,
    @Body() healReq: HealRequest
  ): Promise<HitPointStatus> {
    return this.playerService.healPlayer(playerId, healReq.amount);
  }

  /**
   * Grants temporary hit points to a player.
   *
   * This endpoint allows you to grant temporary hit points to a specified player, which are added to their current hit points.
   * Temporary hit points do not stack; the highest value is kept.
   *
   * @param playerId The ID of the player to grant temporary hit points.
   * @param tmpHPReq An object containing the amount of temporary hit points to grant.
   * @returns The updated hit points status of the player.
   *
   * @example playerId "briv"
   * @example tmpHPReq {
   *   "amount": 5
   * }
   */
  @Example<HitPointStatus>(hitPointStatusExample)
  @Patch("{playerId}/hp/grant-temporary-hp")
  public async addTemporaryHealthPointsToPlayer(
    playerId: string,
    @Body() tmpHPReq: TemporaryHPRequest
  ): Promise<HitPointStatus> {
    return this.playerService.grantPlayerTemporaryHitPoints(
      playerId,
      tmpHPReq.amount
    );
  }

  /**
   * Retrieves the hit points of a player.
   *
   * This endpoint allows you to retrieve the current, maximum, and temporary hit points of a specified player.
   *
   * @param playerId The ID of the player to retrieve hit points for.
   * @returns The current, maximum, and temporary hit points of the player.
   *
   * @example playerId "briv"
   */
  @Example<HitPointStatus>(hitPointStatusExample)
  @Get("{playerId}/hp")
  public async getPlayerHitPoints(playerId: string): Promise<HitPointStatus> {
    console.log(`Getting hit points for player ${playerId}`);
    return this.playerService.getPlayerHitPoints(playerId);
  }
}
