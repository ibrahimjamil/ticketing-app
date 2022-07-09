export class DatabaseError extends Error {
    constructor(){
        super()
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}