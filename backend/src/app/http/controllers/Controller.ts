import { Request, Response } from "express";

export interface IController {
  index: (request: Request, response: Response) => Promise<Response>;
  show: (request: Request, response: Response) => Promise<Response>;
  store: (request: Request, response: Response) => Promise<Response>;
  update: (request: Request, response: Response) => Promise<Response>;
  destroy: (request: Request, response: Response) => Promise<Response>;
}
