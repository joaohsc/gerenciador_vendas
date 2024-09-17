import { Role } from "../enums";
import { Request, Response, NextFunction } from "express";

export const roleMiddleware = async (req : Request, res : Response, next : NextFunction) =>{
    if (Role.manager !== req.user.role) {
        res.status(403).send({ message: "Você não tem permissão para prosseguir." });
        return;
    }
    next()
}