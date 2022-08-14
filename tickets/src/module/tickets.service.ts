import TicketRepository from './tickets.repository';

class TicketService {
  public ticketRepository: TicketRepository;
  constructor () {
    this.ticketRepository = new TicketRepository();
  }

  public addTicket = async (param: any) => {
    return await this.ticketRepository.addTicket(param);
  }

  public getAllTickets = async () => {
    return await this.ticketRepository.getAllTickets();
  }

  public getTicket = async (id: any) => {
    return await this.ticketRepository.getTicket(id);
  }
}

export default new TicketService();
