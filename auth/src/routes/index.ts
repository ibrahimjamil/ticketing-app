import { setUpPem, verifyAccessToken, verifyIdToken } from "../middlewares/authMiddleware";
import { AuthController } from "../module/auth.controller";

export const noAuthRoutes = [
    {
      path: '/users/',
      action: new AuthController().routes()
    },
  ];

export const AppRoutes = [
  {
    path: '/users/getUser',
    middleware: [setUpPem, verifyAccessToken, verifyIdToken],
    action: new AuthController().routes()
  },
];
  