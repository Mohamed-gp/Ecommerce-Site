  import express from "express";
  import authRouter from "./routes/authRouter";
  import userRouter from "./routes/usersRouter";
  import productsRouter from "./routes/productsRouter";
  import connectToDB from "./lib/connectToDB";
  import dotenv from "dotenv";
  import cors from "cors";
  import { notFound, errorHandler } from "./middlewares/errors";
  import multer from "multer";
  import { v2 as cloudinary } from "cloudinary";

  export const upload = multer({ dest: "uploads/" });

  dotenv.config();
  const app = express();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SEC, // Click 'View Credentials' below to copy your API secret
  });

  export { cloudinary };

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
  app.use("/api/users", userRouter);
  app.use("/api/products", productsRouter);
  // app.use("/api/admin",adminRouter)

  app.use(notFound);
  app.use(errorHandler);
