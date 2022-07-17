import { CustomAbstractClass } from "./customAbstractError";

export class SchemaValidationError extends CustomAbstractClass {
    public statusCode: number;
    constructor(public error: (string | number | undefined)[]){
        super('schema validation error')
        this.statusCode = 400;
        (<any>Object).setPrototypeOf(this, SchemaValidationError.prototype);
    }

    serializeErrors(){
        return  this.error.map((field) => {
            return {
                error: true,
                zodError: true,
                field: field ? field : undefined,
                message: `field of ${field} is missing or misaligned`
            }
        })
    }
}