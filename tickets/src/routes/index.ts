import { verifyAccessToken, verifyIdToken } from "@ibrahimticketing/common";
import { setUpPem } from "../middlewares/authMiddleware";
import { TicketController } from "../module/tickets.controller";

export const noAuthRoutes = [
    {
      path: '/tickets-demo/',
      action: (req: any, res: any) => {
        res.status(200)
      }
    },
  ];

export const AppRoutes = [
  {
    path: '/tickets',
    middleware: [setUpPem, verifyAccessToken, verifyIdToken],
    action:  new TicketController().routes()
  }
];
  