import { AppError } from "./errors.js";

export class ResourceError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}
