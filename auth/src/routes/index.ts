import { verifyAccessToken, verifyIdToken } from "@ibrahimticketing/common";
import { setUpPem } from "../middlewares/authMiddleware";
import { AuthController } from "../module/auth.controller";

export const noAuthRoutes = [
    {
      path: '/users/',
      action: new AuthController().routes()
    },
  ];

export const AppRoutes = [
  {
    path: '/users/protected/getUser',
    middleware: [setUpPem, verifyAccessToken, verifyIdToken],
    action: new AuthController().routes()
  }
];
  