import IClient from "../../models/interfaces/Client";
import { ResponseType } from "../../models/types/ResponseType";

export const handleClientValidation = (data: IClient): ResponseType => {
  console.log(data);
  if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.x_coordinate ||
    !data.y_coordinate
  ) {
    return {
      status: "error",
      message: "Todos os campos devem ser preenchidos.",
    };
  }

  return {
    status: "success",
    message: "Informações do usuário verificadas.",
    data: data,
  };
};
