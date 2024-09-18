import { db } from "../db";
import { users } from "../db/schema";
import { Role } from "../enums";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

type JwtPayload = {
    id : string
}

export const authMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization){
        return res.status(401).json({message: "Acesso não autorizado!"});
    }

    const token = authorization.split(' ')[1];
    
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '' ) as JwtPayload

    const user = await db.select().from(users).where(eq(users.id, id));
    if (!user[0]) {
        return res.status(400).json({ message: "Acesso não autorizado!" });
    }

    const  {password: _, ...loggedUser} = user[0];

    req.user = loggedUser;

    next()
}