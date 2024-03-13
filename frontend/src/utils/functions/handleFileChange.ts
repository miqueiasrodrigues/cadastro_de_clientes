import { ResponseType } from "../../models/types/ResponseType";

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>
): ResponseType => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];

    const allowedExtensions = ["jpeg", "jpg", "png"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension && allowedExtensions.includes(fileExtension)) {
      return {
        status: "success",
        message: file.name,
        data: file,
      };
    } else {
      event.target.value = "";
      return {
        status: "error",
        message: "Formato não compatível. Tente uma Imagem.",
        data: null,
      };
    }
  }
  return {
    status: "error",
    message: "Não foi possível selecionar a imagem.",
    data: null,
  };
};
