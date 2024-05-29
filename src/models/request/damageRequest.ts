import { DamageType } from "../../enums/damageType";

export interface DamageRequest {
  type: DamageType;
  amount: number;
}
