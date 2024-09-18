import express from 'express';
import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userControllers';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { ManagerController } from '../controllers/managerController';
import { SellerController } from '../controllers/sellerController';


const routes : Router = Router();

routes.post('/auth/login', new UserController().login);

routes.post('/auth/registro', new UserController().create);

routes.use(authMiddleware);

// listar pedidos
routes.get('/pedidos', (req : Request, res : Response)=>{
    res.send('Lista de pedidos');
});

// criar pedido
routes.post('/pedidos', (req : Request, res : Response)=>{
    res.send('registro de pedidos');
});

// listar vendas
routes.get('/vendas', (req : Request, res : Response)=>{
    res.send('Lista de vendas');
});

// criar venda
routes.post('/vendas', new SellerController().createSale);

// permissão de manager
routes.use(roleMiddleware);
// listar vendedores
routes.get('/vendedores', new ManagerController().getVendedores);

// criar vendedor
routes.post('/vendedores', new ManagerController().createVendedores);

// aprovar/desaprovar pedido
routes.post('/pedidos/:id/validar', (req : Request, res : Response)=>{
    res.send('registro de pedidos');
});

export default routes;