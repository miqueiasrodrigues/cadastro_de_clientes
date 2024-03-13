import ClientRepository from "src/app/repositories/ClientRepository";
import IService from "../Service";
import AppError from "src/utils/AppError";
import uploadConfig from "@config/upload";
import path from "path";
import fs from "fs";
import IClient from "src/app/models/interfaces/Client";

class UpdateClientService extends ClientRepository implements IService {
  async execute(id: number, updateClientData: IClient): Promise<IClient> {
    let client = await this.find(id);

    if (!client) {
      throw new AppError("Cliente não encontrado.", 404);
    }

    if (updateClientData.email) {
      const existingClientWithEmail = await this.findByEmail(
        updateClientData.email
      );

      if (existingClientWithEmail && existingClientWithEmail.email !== client.email) {
        throw new AppError("O E-mail já está cadastrado.", 400);
      }
    }

    if (updateClientData.phone) {
      const existingClientWithPhone = await this.findByPhone(
        updateClientData.phone
      );

      if (existingClientWithPhone && existingClientWithPhone.phone !== client.phone) {
        throw new AppError("O Telefone já está cadastrado.", 400);
      }
    }

    if (updateClientData.avatar && client.avatar !== null) {
      const ClientAvatarFilePath = path.join(uploadConfig.directory, client.avatar);

      const ClientAvatarFileExists = await fs.promises
        .stat(ClientAvatarFilePath)
        .catch(() => false);

      if (ClientAvatarFileExists) {
        await fs.promises.unlink(ClientAvatarFilePath);
      }
    }

    client = {
      ...client,
      ...updateClientData,
    };

    await this.update(id, client);

    return client;
  }
}

export default UpdateClientService;
