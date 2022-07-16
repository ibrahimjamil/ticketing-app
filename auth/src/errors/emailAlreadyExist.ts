import { CustomAbstractClass } from "./customAbstractError";
export class EmailExistError extends CustomAbstractClass {
    public statusCode: number;
    public reason: string;
    constructor(){
        super('email already exist')
        this.reason = 'email already exist';
        this.statusCode = 400;
        Object.setPrototypeOf(this, EmailExistError.prototype);
    }

    serializeErrors(){
        return [{
            error: true,
            message: this.reason
        }]
    }
}