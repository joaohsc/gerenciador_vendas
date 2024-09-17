import { client, db } from "../db";
import { Request, response, Response } from "express";
import { users } from "../db/schema";
import { Role } from "../enums";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserRequest {
    username : string, 
    password : string, 
    email : string, 
    role : Role
}

export class UserController {
    async create (req: Request, res: Response) {
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
            role : user.role
        }).returning({ id : users.id, username: users.username, email: users.email, role : users.role });

        return res.status(201).json(result);

    }
    async login (req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await db.select().from(users).where(eq(users.email, email));
        if (!(Object.keys(user).length > 0)) {
            return res.status(400).json({ message: "Email ou senha inválido" });
        }

        const validarSenha = await bcrypt.compare(password, user[0].password)

        if (!validarSenha) {
            return res.status(400).json({ message: "Email ou senha inválido" });
        }

        const token = jwt.sign({id : user[0].id}, process.env.JWT_PASS ?? '', { expiresIn : '6h'} );
        
        const  {password: _, ...userLogin} = user[0]
        return res.json({
            user: userLogin,
            token: token
        });
    }

    // role: manager
    async getVendedores(req : Request, res: Response) {
        return res.json(req.user);
    }
}