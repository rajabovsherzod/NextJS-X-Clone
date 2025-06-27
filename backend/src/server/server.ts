import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mainRouter from "../routes/index.js";
import errorHandler from "../middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Marshrutlar
app.use("/api/v1", mainRouter);


// Eng oxirgi middleware - xatoliklarni ushlab olish uchun
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));



