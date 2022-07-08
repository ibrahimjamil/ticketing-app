import { AuthController } from "../module/auth.controller";

export const noAuthRoutes = [
    {
      path: '/users/',
      action: new AuthController().routes()
    },
  ];
  