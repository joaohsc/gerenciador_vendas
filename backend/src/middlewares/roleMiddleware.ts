import { Role } from "../enums";
import { Request, Response, NextFunction } from "express";

export const roleMiddleware = async (req : Request, res : Response, next : NextFunction) =>{
    if (Role.manager !== req.user.role) {
        return res.status(403).json({ message: "Você não tem permissão para prosseguir." });
    }
    next()
}