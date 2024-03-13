import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Message from "../components/Message";
import { ResponseType } from "../models/types/ResponseType";
import Button from "../components/Button";
import Box from "../components/Box";
import ButtonLink from "../components/ButtonLink";
import View from "../components/View";
import List from "../components/List";
import Input from "../components/Input";
import IClient from "../models/interfaces/Client";
import { CLIENT_DATA } from "../utils/data/clientData";
import { handleClientValidation } from "../utils/functions/handleClientValidation";
import { fetchData } from "../services/fetchData";
import { useParams } from "react-router-dom";

const Create: React.FC = () => {
  const { id } = useParams();

  const [response, setResponse] = React.useState<ResponseType>({
    status: "success",
    message: "",
  });

  const [client, setClient] = React.useState<IClient>(CLIENT_DATA);
  const [image, setImage] = React.useState<ResponseType>({
    message: "Escolha uma imagem",
    status: "success",
    data: null,
  });

  React.useEffect(() => {
    setClient({ ...client, avatar: image.data });
  }, [image.data]);

  React.useEffect(() => {
    const fetchClientData = async () => {
      const fetchedData = await fetchData(`/client/${id}`, "GET");

      if (fetchedData && fetchedData.data) {
        setClient(fetchedData.data);
      }
    };

    if (id !== undefined) {
      fetchClientData();
    }
  }, [id]);
  return (
    <React.Fragment>
      <Card width={90} height={80} color="var(--green-color)" borderRadius={21}>
        <View width={100} height={90} overflowY="hidden" >
          <List width={100} height={25} >
            <Input
              type="text"
              readOnly={false}
              placeholder="Nome"
              value={client.first_name}
              valueChange={(first_name) => setClient({ ...client, first_name })}
            ></Input>
            <Box width={200}></Box>
            <Input
              type="text"
              readOnly={false}
              value={client.last_name}
              placeholder="Sobrenome"
              valueChange={(last_name) => setClient({ ...client, last_name })}
            ></Input>
          </List>
          <List width={100} height={25}>
            <Input
              type="text"
              readOnly={false}
              value={client.email}
              placeholder="E-mail"
              valueChange={(email) => setClient({ ...client, email })}
            ></Input>
            <Box width={200}></Box>
            <Input
              type="text"
              readOnly={false}
              value={client.phone}
              placeholder="Telefone"
              valueChange={(phone) => setClient({ ...client, phone })}
            ></Input>
          </List>
          <List width={100} height={25}>
            <Input
              type="file"
              label={image.message}
              readOnly={false}
              valueChange={setImage}
            ></Input>
          </List>
          <List width={100} height={25}>
            <Input
              type="number"
              value={client.x_coordinate}
              readOnly={false}
              placeholder="Coordenada X"
              valueChange={(x_coordinate) =>
                setClient({ ...client, x_coordinate })
              }
            ></Input>
            <Box width={200}></Box>
            <Input
              type="number"
              readOnly={false}
              value={client.y_coordinate}
              placeholder="Coordenada Y"
              valueChange={(y_coordinate) =>
                setClient({ ...client, y_coordinate })
              }
            ></Input>
          </List>
        </View>
        <div className="button-control create">
          <ButtonLink height={40} width={120} color="var(--red-color)" href="/">
            Cancelar
          </ButtonLink>
          <Box width={10}></Box>
          <Button
            height={40}
            width={120}
            color="var(--green-color)"
            action={async () => {
              const clientData = handleClientValidation(client);
              if (clientData.status !== "error") {
                const clientFormData = new FormData();
                clientFormData.append("first_name", clientData.data.first_name);
                clientFormData.append("last_name", clientData.data.last_name);
                clientFormData.append("email", clientData.data.email);
                clientFormData.append("phone", clientData.data.phone);
                clientFormData.append(
                  "x_coordinate",
                  clientData.data.x_coordinate.toString()
                );
                clientFormData.append(
                  "y_coordinate",
                  clientData.data.y_coordinate.toString()
                );

                if (clientData.data.avatar) {
                  clientFormData.append("avatar", clientData.data.avatar);
                }

                const sendData =
                  id === undefined
                    ? await fetchData("/client/", "POST", clientFormData)
                    : await fetchData(`/client/${id}`, "PUT", clientFormData);
                setResponse(sendData);

                if (sendData.status === "success") {
                  setClient(CLIENT_DATA);
                  setImage({
                    message: "Escolha uma imagem",
                    status: "success",
                    data: null,
                  });
                }
              } else {
                setResponse(clientData);
              }
            }}
          >
            {id === undefined ? "Cadastar" : "Editar"}
          </Button>
        </div>
      </Card>
      <Message
        response={response}
        height={10}
        width={90}
        changeMessage={() => setResponse}
      ></Message>
    </React.Fragment>
  );
};

export default Create;
