import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";
import ApiRouter from "./routes/ApiRouter.js";
import helmet from "helmet";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware.js";
import "./config/postgres.js";
import morgan from "morgan";
import logger from "./utils/Logger.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";
import { authenticate } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const stream = {
  write: (message) => logger.info(message.trim()),
};

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: (_, callback) => {
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(morgan("combined", { stream }));
app.use(cookieParser());

app.get("/", (_, res) => {
  res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", AuthRouter);
app.use("/api", ApiRouter);

app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you're authenticated!` });
});

app.get("/api/hello", (req, res) => {
  res.json("Servern är igång!");
});

app.get("/", (_, res) => {
  res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Handle not found
app.use(notFoundHandler);

//Handle all errors
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is runnig at http://localhost:${PORT}`));
