import { Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";

const DEMO_ADMIN_ID = "66f16f6ae8f6650bf25c28d3";

const demoAdmin = (
  req: authRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  // Only apply restrictions to the specific demo admin user
  if (req.user && req.user.id === DEMO_ADMIN_ID) {
    const action = req.method.toLowerCase();

    // Allow ONLY GET requests (viewing data) for demo admin
    if (action === "get") {
      return next();
    }

    // Block ALL other HTTP methods for demo admin
    let message = "Demo Admin - This action is restricted in demo mode.";

    // Customize messages based on the action
    switch (action) {
      case "post":
        message =
          "Demo Admin - Create operations are not allowed in demo mode.";
        break;
      case "put":
      case "patch":
        message =
          "Demo Admin - Update operations are not allowed in demo mode.";
        break;
      case "delete":
        message =
          "Demo Admin - Delete operations are not allowed in demo mode.";
        break;
      default:
        message = "Demo Admin - This action is restricted in demo mode.";
    }

    return res.status(403).json({
      message,
      data: null,
      isDemo: true,
    });
  }

  // Allow all operations for non-demo admins
  return next();
};

export default demoAdmin;
