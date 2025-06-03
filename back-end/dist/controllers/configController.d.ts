import { Request, Response } from "express";
/**
 * Provides Firebase configuration to the client
 * Only exposes what's necessary for client authentication
 */
declare const getFirebaseConfig: (req: Request, res: Response) => Response<any, Record<string, any>>;
export { getFirebaseConfig };
//# sourceMappingURL=configController.d.ts.map