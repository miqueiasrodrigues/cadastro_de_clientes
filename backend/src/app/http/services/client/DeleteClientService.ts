import ClientRepository from "src/app/repositories/ClientRepository";
import AppError from "src/utils/AppError";
import IService from "../Service";

class DeleteClientService extends ClientRepository implements IService {
  async execute(id: number): Promise<void> {
    const client = await this.find(id);
    if (!client) {
      throw new AppError("Cliente não encontrado.", 404);
    }
    await this.delete(id);
  }
}

export default DeleteClientService;
