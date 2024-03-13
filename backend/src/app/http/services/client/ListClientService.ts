import ClientRepository from "src/app/repositories/ClientRepository";
import IService from "../Service";
import AppError from "src/utils/AppError";
import IClientFilter from "src/app/models/interfaces/ClientFilter";
import IClient from "src/app/models/interfaces/Client";
import { nearestNeighborAlgorithm } from "src/utils/functions/nearestNeighborAlgorithm";

class ListClientService extends ClientRepository implements IService {
  async execute(
    filters: IClientFilter,
    limit: number,
    offset: number
  ): Promise<IClient[]> {
    let clients;
    if (filters && Object.keys(filters).length > 0) {
      clients = await this.findByFilters(filters, limit, offset);
      if (clients === null) {
        throw new AppError("Clientes não encontrados.", 404);
      }
    } else {
      clients = await this.findAll(limit, offset);
    }
    if (clients === null || clients.length === 0) {
      throw new AppError("Clientes não encontrados.", 404);
    }

    return clients;
  }

  async getTotalClients(filters: IClientFilter): Promise<number> {
    let totalClients;
    if (filters && Object.keys(filters).length > 0) {
      totalClients = await this.countAll(filters);
    } else {
      totalClients = await this.countAll();
    }
    return totalClients;
  }

  async findAllWithCoordinates(): Promise<IClient[]> {
    const clients = await this.findAll();
    if (clients === null || clients.length === 0) {
      throw new AppError("Clientes não encontrados.", 404);
    }
    const clientWithCoordinates = nearestNeighborAlgorithm(clients);
    return clientWithCoordinates;
  }
}

export default ListClientService;
