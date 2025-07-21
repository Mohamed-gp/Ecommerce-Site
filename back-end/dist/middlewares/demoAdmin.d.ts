import { Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
declare const demoAdmin: (req: authRequest, res: Response, next: NextFunction) => Response | void;
export default demoAdmin;
//# sourceMappingURL=demoAdmin.d.ts.map