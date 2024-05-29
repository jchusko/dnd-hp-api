import express, { json, urlencoded } from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import { RegisterRoutes } from "./routes/routes";

const swaggerJson = require("./swagger/swagger.json");

const app = express();
const port = 3000;

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());
app.use(bodyParser.json());

RegisterRoutes(app);

app.use(errorHandler);

// Swagger
app.use(["/docs"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
