import express from "express";
import routes from "./routes/route.index";
import "reflect-metadata";
import config from "./config";
import AppDataSource from "./typeORMfile";
const app = express();

app.use(express.json());

AppDataSource.initialize()
    .then(()=>{
        console.log("Database is successfully connected");
    })
    .catch((err)=> console.log("Error connecting database",err));

app.use(routes);

app.listen(config.port, () =>{
    console.log("port 8000 is listening");
});
