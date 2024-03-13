import app from "./config/app";
import pool from "./database/pool";
import "reflect-metadata";

pool.connect()
  .then(() => {
    app.listen(3333, () => {
      console.log(`Servidor iniciado na porta ${3333}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao iniciar a base de dados:", error.message);
  });
