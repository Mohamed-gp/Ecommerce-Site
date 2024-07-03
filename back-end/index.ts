import express from "express";
import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser";
import connectToDB from "./lib/connectToDB";
import dotenv from "dotenv";
import cors from "cors";
import {notFound,errorHandler} from "./middlewares/errors"



dotenv.config();
const app = express();

connectToDB(process.env.MONGODB_URI as string);
const PORT = 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});

app.use("/api/auth", authRouter);




app.use(notFound)
app.use(errorHandler)
