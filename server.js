import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRouter.js";
import ApiRouter from "./routes/ApiRouter.js";
import helmet from "helmet";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware.js";
import "./config/postgres.js";
import morgan from 'morgan';
import logger from './utils/Logger.js'
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/verifyJWT.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const stream = {
    write: (message) => logger.info(message.trim()),
};

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream }));
app.use(cookieParser());

app.use("/auth", AuthRouter);
app.use("/api", ApiRouter);

app.get("/api/protected", authenticate, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, you're authenticated!` });
});



//Handle not found
app.use(notFoundHandler);

//Handle all errors
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is runnig at http://localhost:${PORT}`));
