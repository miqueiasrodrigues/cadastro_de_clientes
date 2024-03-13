import { IController } from "./Controller";
import { Request, Response } from "express";
import CreateClientService from "../services/client/CreateClientService";
import ShowClientService from "../services/client/ShowClientService";
import ListClientService from "../services/client/ListClientService";
import UpdateClientService from "../services/client/UpdateClientService";
import DeleteClientService from "../services/client/DeleteClientService";
import IClient from "src/app/models/interfaces/Client";
import ResponseFormat from "../ResponseFormat";
import IClientFilter from "src/app/models/interfaces/ClientFilter";

class ClientController implements IController {
  async index(request: Request, response: Response): Promise<Response> {
    const { first_name, last_name, email, phone, page, limit, by_routes } =
      request.query;

    const filters: IClientFilter = {};
    if (first_name) filters.first_name = first_name as string;
    if (last_name) filters.last_name = last_name as string;
    if (email) filters.email = email as string;
    if (phone) filters.phone = phone as string;

    const pageQuery = page ? parseInt(page as string) : 1;
    const limitQuery = limit ? parseInt(limit as string) : 5;
    const offset = (pageQuery - 1) * limitQuery;

    const listService = new ListClientService();
    if (by_routes === "true") {
      const clients = await listService.findAllWithCoordinates();
      return ResponseFormat.success(
        response,
        "Clientes listados com sucesso.",
        {clients: clients}
      );
    } else {
      const clients = await listService.execute(filters, limitQuery, offset);
      const totalClients = await listService.getTotalClients(filters);
      const totalPages = Math.ceil(totalClients / limitQuery);
      const isLastPage = pageQuery === totalPages;

      return ResponseFormat.success(
        response,
        "Clientes listados com sucesso.",
        {
          clients: clients,
          pagination: {
            currentPage: pageQuery,
            totalPages: totalPages,
            isLastPage: isLastPage,
          },
        }
      );
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showService = new ShowClientService();
    const client = await showService.execute(parseInt(id));

    return ResponseFormat.success(
      response,
      "Cliente listado com sucesso.",
      client
    );
  }

  async store(request: Request, response: Response): Promise<Response> {
    let data: IClient = request.body;
    const avatar = request.file?.filename;
    if (avatar) {
      data = { ...data, avatar };
    }

    const createService = new CreateClientService();
    const client = await createService.execute(data);

    return ResponseFormat.success(
      response,
      "Cliente criado com sucesso.",
      client,
      201
    );
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    let updateData: IClient = request.body;
    const avatar = request.file?.filename;

    if (avatar) {
      updateData = { ...updateData, avatar };
    }

    const updateService = new UpdateClientService();
    const client = await updateService.execute(parseInt(id), updateData);

    return ResponseFormat.success(
      response,
      "Cliente atualizado com sucesso.",
      client
    );
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteService = new DeleteClientService();
    await deleteService.execute(parseInt(id));

    return ResponseFormat.success(response, "Cliente excluído com sucesso.");
  }
}

export default ClientController;
