import { verifyAccessToken, verifyIdToken } from "@ibrahimticketing/common";
import { setUpPem } from "../middlewares/authMiddleware";

export const noAuthRoutes = [
    {
      path: '/users/',
      action: () => {}
    },
  ];

export const AppRoutes = [
  {
    path: '/users/protected/getUser',
    middleware: [setUpPem, verifyAccessToken, verifyIdToken],
    action: () => {}
  }
];
  