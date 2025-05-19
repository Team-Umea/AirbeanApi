import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";
import ApiRouter from "./routes/ApiRouter.js";
import helmet from "helmet";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware.js";
import "./config/postgres.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/api", ApiRouter);

//Handle not found
app.use(notFoundHandler);

//Handle all errors
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is runnig at http://localhost:${PORT}`));
