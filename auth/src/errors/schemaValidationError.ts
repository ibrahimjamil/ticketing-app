export class SchemaValidationError extends Error {
    constructor(public error: (string | number)[]){
        super()
        Object.setPrototypeOf(this, SchemaValidationError.prototype);
    }
}