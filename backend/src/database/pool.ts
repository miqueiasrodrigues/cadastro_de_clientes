import { Pool } from "pg";
import { CreateClients } from "./migrations/CreateClients";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gerenciamento_clientes",
  password: "2yk7",
  port: 5432,
});

async function runMigrations() {
  const createClientsMigration = new CreateClients();
  await createClientsMigration.up();
}

pool
  .connect()
  .then(() => {
    console.log("Conectado ao banco de dados PostgreSQL");
    runMigrations()
      .then(() => {
        console.log("Migrações executadas com sucesso.");
      })
      .catch((error) => {
        console.error("Erro ao executar migrações:", error);
      });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados PostgreSQL:", error);
  });

export default pool;
