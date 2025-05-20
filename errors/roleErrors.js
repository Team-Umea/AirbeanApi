import { AppError } from "./errors.js";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 403);
  }
}
