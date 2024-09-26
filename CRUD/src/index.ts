import express from "express";
import routes from "./routes/index.route";
import "reflect-metadata";
import config from "./config";
import AppDataSource from "./typeORMfile";
import { errorHandler } from "./middleware/errorValidator";
import { requestLogger } from "./middleware/logger";
import loggerWithNameSpace from "./utilis/logger";
import swaggerDocs from "./utilis/swagger";

const logger = loggerWithNameSpace("Index");

const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    logger.info("Database is successfully connected");
    app.listen(config.port, () => {
      logger.info(`Port is listening on ${config.port}`);
      swaggerDocs(app, +config.port!);
    });
  })
  .catch((err) => logger.error("Error connecting database : ", err));

app.use(requestLogger);

app.use(routes);

app.use(errorHandler);
