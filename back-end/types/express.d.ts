// types/express.d.ts
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

// interface ProcessEnv {
//   NODE_ENV: "development" | "production";
//   JWT_SECRET: string;
//   // Add other environment variables as needed
// }

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv extends ProcessEnv {}
//   }
// }
