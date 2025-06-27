import { NextFunction, Request, Response } from "express"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    console.error('ERROR 💥:', err)

    res.status(statusCode).json({
        status: statusCode >= 500 ? "error" : "fail",
        message,
        errors: err.errors && err.errors.length > 0 ? err.errors : undefined,
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    })
}

export default errorHandler