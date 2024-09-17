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
        res.status(401).send({message: "Acesso não autorizado!"})
        return;
    }

    const token = authorization.split(' ')[1];
    
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '' ) as JwtPayload

    const user = await db.select().from(users).where(eq(users.id, id));
    if (!user[0]) {
        res.status(400).send({ message: "Acesso não autorizado!" });
        return;
    }

    const  {password: _, ...loggedUser} = user[0];

    req.user = loggedUser;

    next()
}