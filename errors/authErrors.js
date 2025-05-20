import { AppError } from "./errors.js";

export class LoginError extends AppError {
  constructor(message = "Login failed") {
    super(message, 400);
  }
}

export class UnauthenticatedError extends AppError {
  constructor(message = "Unauthenticated") {
    super(message, 401);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 403);
  }
}
