import { MethodHttpType } from "../models/types/MethodHttpType";
import { ResponseType } from "../models/types/ResponseType";

export const fetchData = async (
  prefix: string = "/",
  method: MethodHttpType = "GET",
  formData?: FormData,
  param: string = ""
): Promise<ResponseType> => {
  try {
    const url = `http://localhost:3333${prefix}${
      param !== "" ? "/" + param : ""
    }`;

    const options: RequestInit = {
      method: method,
      body: formData,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      const res = JSON.parse(errorMessage);
      return {
        status: res.status,
        message: res.message,
      };
    }

    const data = await response.json();
    return {
      status: data["status"],
      message: data["message"],
      data: data["data"],
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro na comunicação com o servidor.",
    };
  }
};
