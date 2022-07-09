import { CustomAbstractClass } from "./customAbstractError";

export class SchemaValidationError extends CustomAbstractClass {
    public statusCode: number;
    constructor(public error: (string | number | undefined)[]){
        super('schema validation error')
        this.statusCode = 400;
        Object.setPrototypeOf(this, SchemaValidationError.prototype);
    }

    serializeErrors(){
        return  this.error.map((field) => {
            return {
                field: field ? field : undefined,
                message: `field of ${field} is missing or misaligned`
            }
        })
    }
}