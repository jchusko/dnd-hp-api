import { DamageType } from "../../enums/damageType";
import { DefenseType } from "../../enums/defenseType";

export interface Player {
  name: string;
  level: number;
  maxHitPoints: number;
  hitPoints: number;
  state: PlayerState;
  classes: PlayerClass[];
  stats: Stats;
  items: Item[];
  defenses: Defense[];
}

interface PlayerState {
  hitPoints: number;
  tempHitPoints: number;
}

interface PlayerClass {
  name: string;
  hitDiceValue: number;
  classLevel: number;
}

interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface Defense {
  type: DamageType;
  defense: DefenseType;
}

interface Item {
  name: string;
  modifier: ItemModifier[];
}

interface ItemModifier {
  affectedObject: string;
  affectedValue: string;
  value: number;
}
