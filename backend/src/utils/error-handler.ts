import { Response } from 'express';

class ErrorHandler {
    public async handle(error: Error, res : Response){
        console.error({
            message : error.message ?? "Um erro inexperado ocorreu!",
            error,
        });

        if (error instanceof Error) {
            const err = error as Error & { statusCode?: number };
            res.status(err.statusCode ?? 500).json({ message: err.message });
            return;
        }

        res.status(500).json({ message: "Um erro insesperado ocorreu!" });
    }
}

export const errorHandler = new ErrorHandler();