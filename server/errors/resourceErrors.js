import { AppError } from "./errors.js";

export class ResourceNotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ResourceUpdateError extends AppError {
  constructor(message = "Error updating resource") {
    super(message, 400);
  }
}

export class InvalidResourceValue extends AppError {
  constructor(message = "Invalid resource value") {
    super(message, 400);
  }
}

export class ResourceConflictError extends AppError {
  constructor(message = "Conflict occured") {
    super(message, 409);
  }
}
