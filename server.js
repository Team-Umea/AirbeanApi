import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";
import ApiRouter from "./routes/ApiRouter.js";
import helmet from "helmet";
import cors from "cors";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/errorMiddleware.js";
import "./config/postgres.js";
import morgan from "morgan";
import logger from "./logger.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const stream = {
  write: (message) => logger.info(message.trim()),
};

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined", { stream }));
app.use(express.json());

app.get("/", (_, res) => {
  res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", AuthRouter);
app.use("/api", ApiRouter);

//Handle not found
app.use(notFoundHandler);

//Handle all errors
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is runnig at http://localhost:${PORT}`)
);
