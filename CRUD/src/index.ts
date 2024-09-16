import express from "express";
import routes from "./routes/route.index";
const app = express();

app.use(express.json());

app.use(routes);

app.listen(8000, () =>{
    console.log("port 8000 is listening");
});
