import { Response } from "express";

class ResponseFormat {
  static success(response: Response, message: string, data?: any, statusCode: number = 200) {
    return response.status(statusCode).json({
      status: "success",
      message: message,
      data: data,
    });
  }

  static error(response: Response, message: string, statusCode: number = 400) {
    return response.status(statusCode).json({
      status: "error",
      message: message,
    });
  }
}

export default ResponseFormat;
