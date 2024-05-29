import { CustomErrorBase } from "./customErrorBase";

export class PlayerNotFoundError extends CustomErrorBase {
  constructor(message: string = "Player not found") {
    super(message);
    this.name = "PlayerNotFoundError";
  }
}
