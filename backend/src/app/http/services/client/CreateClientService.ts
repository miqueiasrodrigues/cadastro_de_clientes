import ClientRepository from "src/app/repositories/ClientRepository";
import IService from "../Service";
import AppError from "src/utils/AppError";
import { hash } from "bcrypt";
import IClient from "src/app/models/interfaces/Client";

class CreateClientService extends ClientRepository implements IService {
  async execute(clientData: IClient): Promise<IClient> {
    if (clientData.email && (await this.findByEmail(clientData.email))) {
      throw new AppError("o E-mail já está cadastrado.", 400);
    }

    if (clientData.phone && (await this.findByPhone(clientData.phone))) {
      throw new AppError("o Telefone já está cadastrado.", 400);
    }

    const client = await this.save(clientData);
    
    return client;
  }
}

export default CreateClientService;
