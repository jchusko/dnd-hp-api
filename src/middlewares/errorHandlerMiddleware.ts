import e, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { CustomErrorBase } from "../errors/customErrorBase";
import { PlayerNotFoundError } from "../errors/playerNotFound";
import { ValidationError } from "../errors/validationError";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomErrorBase) {
    if (err instanceof PlayerNotFoundError) {
      res.status(404).json({ error: err.message });
    } else if (err instanceof ValidationError) {
      res.status(422).json({ error: err.message });
    } else {
      console.error("Unhandled exception");
      console.error(err);
      res.status(500).json({ error: "Unhandled exception" });
    }
  } else {
    console.error(`Error occurred: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default errorHandler;
