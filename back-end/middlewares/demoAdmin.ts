import { Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";

const DEMO_ADMIN_ID = "66f16f6ae8f6650bf25c28d3";

const demoAdmin = (
  req: authRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  if (req.user && req.user.id === DEMO_ADMIN_ID) {
    const action = req.method.toLowerCase();
    const path = req.path;

    let message = "Demo Admin - This action is restricted in demo mode.";

    // Customize messages based on the action
    if (action === "delete") {
      message = "Demo Admin - Delete operations are not allowed in demo mode.";
    } else if (action === "post" || action === "put" || action === "patch") {
      if (path.includes("product")) {
        message =
          "Demo Admin - Product modifications are restricted in demo mode.";
      } else if (path.includes("category")) {
        message =
          "Demo Admin - Category modifications are restricted in demo mode.";
      } else if (path.includes("user")) {
        message = "Demo Admin - User management is restricted in demo mode.";
      } else if (path.includes("order")) {
        message =
          "Demo Admin - Order modifications are restricted in demo mode.";
      } else {
        message =
          "Demo Admin - Create/Update operations are restricted in demo mode.";
      }
    }

    return res.status(403).json({
      message,
      data: null,
      isDemo: true,
    });
  }
  return next();
};

export default demoAdmin;
