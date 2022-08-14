import { Ticket } from "../model/tickets";

class TicketRepository {
    constructor(){

    }

    public addTicket = async (params: any) => {
        const ticket = Ticket.build(params);
        return await ticket.save();
    }

    public getAllTickets = async () => {
        const tickets = await Ticket.find({});
        return tickets
    }

    public getTicket = async (id: any) => {
        const ticket = await Ticket.findOne({
            id: id
        })
        return ticket
    }

    public updateTicket = async (id: any, newTicket: any) => {
        const ticket = await Ticket.findByIdAndUpdate(id, newTicket);
        return ticket;
    }
}

export default TicketRepository;