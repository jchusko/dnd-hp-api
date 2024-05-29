import { CustomErrorBase } from "./customErrorBase";

export class ValidationError extends CustomErrorBase {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
