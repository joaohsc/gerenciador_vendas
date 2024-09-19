import { client, db } from "../db";
import { Request, response, Response } from "express";
import { users, pedidos } from "../db/schema";
import { Role } from "../enums";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserRequest {
    username : string, 
    password : string, 
    email : string, 
    role : Role,
    createdBy : string
}

export class ManagerController {
    async aprovarPedido (req: Request, res: Response){
        const id : string = req.params.id
        const pedido = await db.update(pedidos)
            .set({ aprovado : true })
            .where(eq(pedidos.id, id)).returning();

        return res.json(pedido)
    }
    async reprovarPedido (req: Request, res: Response){
        const id : string = req.params.id
        const pedido = await db.update(pedidos)
            .set({ aprovado : false })
            .where(eq(pedidos.id, id)).returning();

        return res.json(pedido)
    }
    async createVendedores (req: Request, res: Response) {
        const user : UserRequest = req.body;

        const userExists = await db.select().from(users).where(eq(users.email, user.email));
        if (Object.keys(userExists).length > 0) {
            return res.status(400).json({ message: "O email já existe!" });
        }

        const hashPassword = await bcrypt.hash(user.password, 10)

        const result = await db.insert(users).values({
            username : user.username, 
            password : hashPassword, 
            email : user.email, 
            role : "seller", //cadastro de seller
            createdBy : req.user.id // id do usuário atual: gerente
        }).returning({ id : users.id, username: users.username, email: users.email, role : users.role, createdBy : users.createdBy });

        return res.status(201).json(result);
    }
    async getVendedores(req : Request, res: Response) {
        const result = await db.select().from(users).where(eq(users.role, "seller"));

        return res.json(result);
    }
}