import { NextFunction, Request, Response } from "express";
import { CustomAbstractClass } from "../errors/customAbstractError";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response, 
    next: NextFunction
) => {
    if (res.headersSent) {
        return next();
    }
    if (error instanceof CustomAbstractClass) return res.status(error.statusCode).send({error: error.serializeErrors()})
    res.status(400).send({
        error:[{
            message: "something went wrong"
        }]
    })
}