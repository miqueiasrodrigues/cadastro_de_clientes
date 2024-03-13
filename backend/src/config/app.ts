import express from "express";
import cors from "cors";
import "express-async-errors"
import { errors } from "celebrate";
import routes from "../routes";
import ServerError from "../app/http/middlewares/ServerError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());
app.use(ServerError.handle);

export default app;
