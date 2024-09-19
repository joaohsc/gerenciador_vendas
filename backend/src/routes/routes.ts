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
routes.get('/pedidos', new SellerController().getSalesRequest);

// criar pedido
routes.post('/pedidos', new SellerController().createSalesRequest);

// transformar pedido em venda
routes.post('/pedidos/:id/vendas', new SellerController().createAprovedSale);
// deletar pedido
routes.delete('/pedidos/:id', new SellerController().deleteSaleRequest);

// listar vendas
routes.get('/vendas', new SellerController().getSales);

// criar venda
routes.post('/vendas', new SellerController().createSale);
// deletar venda
routes.delete('/vendas/:id', new SellerController().deleteSale);

// permissão de manager
routes.use(roleMiddleware);
// listar vendedores
routes.get('/vendedores', new ManagerController().getVendedores);

// criar vendedor
routes.post('/vendedores', new ManagerController().createVendedores);

// aprovar/desaprovar pedido
routes.put('/pedidos/:id/aprovar', new ManagerController().aprovarPedido);
routes.put('/pedidos/:id/reprovar', new ManagerController().reprovarPedido);

export default routes;