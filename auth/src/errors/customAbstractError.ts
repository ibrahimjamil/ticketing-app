export abstract class CustomAbstractClass extends Error{
    abstract statusCode: number;

    constructor(message?: string){
        super(message);
        Object.setPrototypeOf(this, CustomAbstractClass.prototype);
    }

    abstract serializeErrors(): {field?: string | number ; message: string}[]
}