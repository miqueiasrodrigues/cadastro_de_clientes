import { NextFunction, Request, Response } from "express";
import AppError from "src/utils/AppError";
import ResponseFormat from "../ResponseFormat";

class ServerError {
  static handle(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ): Response {
    if (error instanceof AppError) {
      return ResponseFormat.error(response, error.message, error.statusCode);
    }

    return ResponseFormat.error(response, "Erro interno no servidor.", 500);
  }
}

export default ServerError;
