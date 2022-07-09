import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../errors/databaseError";
import { SchemaValidationError } from "../errors/schemaValidationError";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response, 
    next: NextFunction
) => {
    if (res.headersSent) {
        return next();
    }
    if (error instanceof SchemaValidationError){
        res.status(400).send({
            message: "schema validation error occurred"
        })
    }
    else if(error instanceof DatabaseError){
        res.status(500).send({
            message: "DB issue"
        })
    }else{
        res.status(400).send({
            message: "something went wrong"
        })
    }
}