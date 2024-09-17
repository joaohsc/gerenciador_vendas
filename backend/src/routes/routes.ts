import express from 'express';
import { Router, Request, Response } from 'express';

const router : Router = Router();

router.get('/login', (req : Request, res : Response)=>{
    res.send('get de login');
});

router.post('/login', (req : Request, res : Response)=>{
    res.send('login de usuário');
});
router.get('/registro', (req : Request, res : Response)=>{
    res.send('get de registro');
});

router.post('/registro', (req : Request, res : Response)=>{
    res.send('Registro de usuário');
});

// listar vendedores
router.get('/vendedores', (req : Request, res : Response)=>{
    res.send('Lista de vendedores');
});

// criar vendedor
router.post('/vendedores', (req : Request, res : Response)=>{
    res.send('registro de vendedores');
});

// listar pedidos
router.get('/pedidos', (req : Request, res : Response)=>{
    res.send('Lista de pedidos');
});

// criar pedido
router.post('/pedidos', (req : Request, res : Response)=>{
    res.send('registro de pedidos');
});

// aprovar/desaprovar pedido
router.post('/pedidos/:id/validar', (req : Request, res : Response)=>{
    res.send('registro de pedidos');
});

// listar vendas
router.get('/vendas', (req : Request, res : Response)=>{
    res.send('Lista de vendas');
});

// criar venda
router.post('/vendas', (req : Request, res : Response)=>{
    res.send('registro de vendas');
});

export default router;