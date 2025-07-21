import { Request } from "express";
export interface LoginInterface {
    email: string;
    password: string;
}
export interface RegisterInterface {
    username: string;
    email: string;
    password: string;
}
export interface DecodedUser {
    id: string;
    role: "user" | "admin";
}
export interface AuthRequest extends Request {
    user?: DecodedUser;
    isDemo?: boolean;
}
export { LoginInterface as loginInterface, RegisterInterface as registerInterface, AuthRequest as authRequest, };
//# sourceMappingURL=authInterface.d.ts.map