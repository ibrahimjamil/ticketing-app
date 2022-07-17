import { CustomAbstractClass } from "./customAbstractError";

export class NotFoundError extends CustomAbstractClass {
    public statusCode: number;
    public reason: string;
    constructor(){
        super('Route not found')
        this.reason = 'not found';
        this.statusCode = 404;
        (<any>Object).Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(){
        return [{
            error: true,
            message: this.reason
        }]
    }
}