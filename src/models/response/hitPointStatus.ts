export interface HitPointStatus {
  id: string;
  currentHP: number;
  maxHP: number;
  temporaryHP: number;
}

export const hitPointStatusExample: HitPointStatus = {
  id: "briv",
  currentHP: 25,
  maxHP: 30,
  temporaryHP: 0,
};
