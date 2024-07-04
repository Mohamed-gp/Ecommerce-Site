import {Request,Response ,NextFunction,} from "express"

const notFound = (req : Request,res : Response,next : NextFunction) => {
    const error = new Error(`not found - ${req.originalUrl}`)
    
    res.status(404)
    next(error)
}


const errorHandler = (err : any,req : Request,res : Response,next : NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({
        message : err.message,
        stack : process.env.NODE_ENV as string === "production" ? null : err.stack
    })
}



export {
    notFound,
    errorHandler
}



