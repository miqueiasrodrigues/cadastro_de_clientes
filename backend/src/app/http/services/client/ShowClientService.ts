import ClientRepository from "src/app/repositories/ClientRepository";
import IService from "../Service";
import AppError from "src/utils/AppError";
import IClient from "src/app/models/interfaces/Client";

class ShowClientService extends ClientRepository implements IService {
  async execute(id: number): Promise<IClient> {
    const client = await this.find(id);
    if (!client) {
      throw new AppError("Cliente não encontrado.", 404);
    }
    return client;
  }
}

export default ShowClientService;
