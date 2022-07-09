import { CustomAbstractClass } from "./customAbstractError";

export class NotFoundError extends CustomAbstractClass {
    public statusCode: number;
    public reason: string;
    constructor(){
        super('Route not found')
        this.reason = 'not found';
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(){
        return [{
            message: this.reason
        }]
    }
}