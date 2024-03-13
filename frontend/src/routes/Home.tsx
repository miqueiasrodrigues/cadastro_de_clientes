import React from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import View from "../components/View";
import List from "../components/List";
import Button from "../components/Button";
import Box from "../components/Box";
import Avatar from "../components/Avatar";
import Icon from "../components/Icon";
import Input from "../components/Input";
import Select from "../components/Select";
import Popup from "../components/Popup";
import ButtonLink from "../components/ButtonLink";
import { handleSearch } from "../utils/functions/handleSearch";
import { fetchData } from "../services/fetchData";
import { ResponseType } from "../models/types/ResponseType";
import IClient from "../models/interfaces/Client";
import { PaginationType } from "../models/types/PaginationType";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [filters, setFilters] = React.useState<string[]>([]);
  const [isDelete, setIsDelete] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    isLastPage: true,
  });
  const [client, setClient] = React.useState<ResponseType>({
    message: "",
    status: "success",
    data: {
      clients: [],
    },
  });

  const handleDelete = async (id?: number) => {
    await fetchData(`/client/${id}`, "DELETE");
    setIsDelete(true);
  };

  React.useEffect(() => {
    const listData = async () => {
      setIsDelete(false);
      let fetchedData;
      setClient({
        message: "",
        status: "success",
        data: {
          clients: [],
        },
      });

      if (!isOpen) {
        if (search === "" && filters.length === 0) {
          fetchedData = await fetchData(
            `/client?page=${pagination.currentPage}`,
            "GET"
          );
        } else {
          const query = handleSearch(search, filters);
          if (query !== "") {
            fetchedData = await fetchData(
              `/client?${query}&page=${pagination.currentPage}`,
              "GET"
            );
          }
        }

        if (pagination.isLastPage && pagination.currentPage > 1) {
          setPagination((prevPagination) => ({
            ...prevPagination,
            currentPage: prevPagination.currentPage - 1,
          }));
        }
      } else {
        fetchedData = await fetchData(`/client?by_routes=true`, "GET");
      }

      if (fetchedData && fetchedData.data !== undefined) {
        if (!isOpen) {
          setPagination(fetchedData.data.pagination);
        }
        setClient({ ...client, data: fetchedData.data });
      } else {
        setClient({
          ...client,
          data: {
            clients: [],
          },
        });
      }
    };
    console.log(client.data["clients"].length);
    listData();
  }, [search, filters, isDelete, pagination.currentPage, isOpen]);

  const goToPreviousPage = () => {
    if (pagination.currentPage > 1) {
      setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
    }
  };

  const goToNextPage = () => {
    if (!pagination.isLastPage) {
      setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
    }
  };

  return (
    <React.Fragment>
      {!isOpen ? (
        <Header height={15} width={100}>
          <div className="search-client">
            <Input type="text" readOnly={false} valueChange={setSearch}></Input>
            <Select
              text="Filtro"
              onChange={setFilters}
              options={["fist_name", "last_name", "email", "phone"]}
              headers={["Nome", "Sobrenome", "E-mail", "Telefone"]}
            ></Select>
          </div>
          <div className="about-client">
            <Button
              color="var(--blue-color)"
              width={100}
              height={46}
              action={() => setIsOpen(true)}
            >
              Visualizar
            </Button>
            <ButtonLink
              color="var(--green-color)"
              width={120}
              height={46}
              href="/create"
              fontColor="var(--black-color)"
            >
              Cadastrar
            </ButtonLink>
          </div>
        </Header>
      ) : (
        <></>
      )}
      {!isOpen ? (
        <React.Fragment>
          <Card color="var(--black-color)" height={85} width={100}>
            <Header height={10} width={100}>
              <ul className="header-view">
                <li style={{ width: "8%" }}>Imagem</li>
                <li>Nome</li>
                <li>Sobrenome</li>
                <li style={{ width: "20%" }}>E-mail</li>
                <li>Telefone</li>
                <li
                  style={{
                    width: "10%",
                  }}
                >
                  Ação
                </li>
              </ul>
            </Header>
            <View
              height={80}
              width={100}
              overflowY="hidden"
              color="var(--white-color)"
            >
              {client.data["clients"].length > 0 ? (
                client.data["clients"].map(
                  (clientData: IClient, index: number) => (
                    <List key={clientData.id} height={20} width={100}>
                      <ul className="content-view">
                        <li
                          style={{
                            width: "8%",
                            justifyContent: "center",
                            paddingLeft: "0px",
                          }}
                        >
                          <Avatar
                            proportion={52}
                            imageUrl={`http://localhost:3333/images/${clientData.avatar}`}
                          ></Avatar>
                        </li>
                        <li>{clientData.first_name}</li>
                        <li>{clientData.last_name}</li>
                        <li style={{ width: "20%" }}>{clientData.email}</li>
                        <li>{clientData.phone}</li>
                        <li
                          style={{
                            width: "10%",
                            justifyContent: "center",
                            paddingLeft: "0px",
                          }}
                        >
                          <div className="btn-view">
                            <Icon
                              title="Edit"
                              imageUri={
                                "https://img.icons8.com/color-glass/96/edit-property.png"
                              }
                              alt="edit-property"
                              proportion={20}
                              to={`/edit/${clientData.id}`}
                            ></Icon>
                            <Icon
                              title="Delete"
                              imageUri={
                                "https://img.icons8.com/color-glass/96/delete-forever.png"
                              }
                              alt="delete-forever"
                              proportion={20}
                              action={() => {
                                handleDelete(clientData.id);
                                setIsDelete(true);
                              }}
                              to="#"
                            ></Icon>
                          </div>
                        </li>
                      </ul>
                    </List>
                  )
                )
              ) : (
                <span className="not-found">Não há clientes.</span>
              )}
            </View>
            <div className="button-control">
              <Button
                height={40}
                width={120}
                color="var(--red-color)"
                action={goToPreviousPage}
              >
                Voltar
              </Button>
              <Box width={10}></Box>
              <Button
                height={40}
                width={120}
                color="var(--blue-color)"
                action={goToNextPage}
              >
                Avançar
              </Button>
            </div>
          </Card>
        </React.Fragment>
      ) : (
        <Popup
          text="Visualização de rotas"
          onChange={() => setIsOpen(false)}
          height={85}
          width={80}
        >
          <Header
            height={10}
            width={100}
            color="var(--black-color)"
            fontColor="var(--white-color)"
          >
            <ul className="header-view" style={{ paddingRight: "12px" }}>
              <li>Imagem</li>
              <li>Nome</li>
              <li>Sobrenome</li>
              <li>Cordenada X</li>
              <li>Cordenada Y</li>
            </ul>
          </Header>
          <View height={80} width={100} overflowY="scroll">
            {client.data["clients"].length > 0 ? (
              client.data["clients"].map(
                (clientData: IClient, index: number) => (
                  <List key={clientData.id} height={20} width={100}>
                    <ul className="content-view">
                      <li>
                        <Avatar
                          proportion={52}
                          imageUrl={`http://localhost:3333/images/${clientData.avatar}`}
                        ></Avatar>
                      </li>
                      <li>{clientData.first_name}</li>
                      <li>{clientData.last_name}</li>
                      <li>{clientData.x_coordinate}</li>
                      <li>{clientData.y_coordinate}</li>
                    </ul>
                  </List>
                )
              )
            ) : (
              <span className="not-found">Não há clientes.</span>
            )}
          </View>
        </Popup>
      )}
    </React.Fragment>
  );
};

export default Home;
