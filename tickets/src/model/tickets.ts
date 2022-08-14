import mongoose from "mongoose";

// interface for user Attribute to pass into
interface TicketAttr {
    title: string;
    price: number;
    userEmail: string;
}
// an interface to describe what user should return 
interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userEmail: string;
}
// an interface to describe what properties userModel should have or to embed into model 
interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attr: TicketAttr): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    }
})

// custom build func to instantiate user according to proper type checking
ticketSchema.statics.build = (attr: TicketAttr) => {
    return new Ticket(attr)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };