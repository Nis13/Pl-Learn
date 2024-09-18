import express from "express";
import routes from "./routes/index.route";
import "reflect-metadata";
import config from "./config";
import AppDataSource from "./typeORMfile";
import { errorHandler } from "./middleware/errorValidator";
import { requestLogger } from "./middleware/logger";
const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database is successfully connected");
    app.listen(config.port, () => {
      console.log("port 8000 is listening");
    });
  })
  .catch((err) => console.log("Error connecting database", err));

app.use(requestLogger);

app.use(routes);

app.use(errorHandler);
