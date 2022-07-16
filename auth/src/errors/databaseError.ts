import { CustomAbstractClass } from "./customAbstractError";
export class DatabaseError extends CustomAbstractClass {
    public statusCode: number;
    public reason: string;
    constructor(){
        super('DB error')
        this.reason = 'DB error';
        this.statusCode = 500;
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }

    serializeErrors(){
        return [{
            error: true,
            message: this.reason
        }]
    }
}