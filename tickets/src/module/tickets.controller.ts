import { Router, Request, Response, NextFunction } from 'express';
import { Ticket } from '../model/tickets';
import { SchemaValidationError, DatabaseError, EmailExistError } from '@ibrahimticketing/common';
import TicketService from './tickets.service';

export class TicketController {
  public router: Router;
  public ticketService = TicketService;


  constructor() {
    this.router = Router();
    this.routes();
  }

  public postTicket = async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = await this.ticketService.addTicket({
      title: title,
      price: price,
      userEmail: req.user.email
    })
    if (ticket){
      res.status(200).send(ticket)
    }else{
      throw new DatabaseError();
    }
  }

  public getAllTickets = async (req: Request, res: Response) => {
    const tickets = await this.ticketService.getAllTickets()
    if (tickets){
      res.status(200).send(tickets)
    }else{
      throw new DatabaseError();
    }
  }

  public getTicket = async (req: Request, res: Response) => {
    const { id } = req.params
    const ticket = await this.ticketService.getTicket(id)
    if (ticket){
      res.status(200).send(ticket)
    }else{
      throw new DatabaseError();
    }
  }

  public routes() {
    this.router.post('/', this.postTicket)
    this.router.get('/', this.getAllTickets);
    this.router.get('/:id', this.getTicket);
    return this.router;
  }
}
