import {Request,Response,NextFunction} from "express"

import logger from "../utils/logger"

export default function errorHandler(
    err:any,
    req:Request,
    res:Response,
    next:NextFunction
){
    logger.error(err.message || "Internal Server Error");

    res.status(500).json({message:"Something went wrong!",
        error:err.message
    });
}