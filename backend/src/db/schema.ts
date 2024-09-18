import { pgTable, pgEnum, text, integer, timestamp, uuid, boolean, real } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

export const roleEnum = pgEnum('role', ['manager', 'seller']);
export const prazoEnum = pgEnum('prazo', ['PADRAO', 'TURBO', 'SUPER TURBO']);
export const pagamentoEnum = pgEnum('pagamento', ['pix', 'boleto','cartao']);

export const users = pgTable('users',{
    id: uuid('id').defaultRandom().primaryKey(),
    username : text('username').notNull(),
    password : text('password').notNull(),
    email: text('email').notNull(),
    role : roleEnum('role').notNull(),
    createdBy: uuid('created_by')
});

export const usersRelations = relations(users, ({ one, many }) => ({
    vendas: many(vendas),
    pedidos: many(pedidos, {relationName : 'pedido_user_id'}),
    gestaoPedidos: many(pedidos, {relationName : 'pedido_gerente_id'}),
    createdBy : one(users, {
      fields: [users.createdBy],
      references: [users.id]
    })
}));

export const products = pgTable('products',{
    sku: text('sku').notNull().primaryKey(),
    produto: text('produto').notNull(),
    precoCheio: real('preco_cheio').notNull(),
    precoDescontado: real('preco_descontado').notNull(),
});

export const pedidos = pgTable('pedidos', {
    id: uuid('id').defaultRandom().primaryKey(),
    sku: text('sku').references(()=>products.sku, {onDelete: 'cascade'}).notNull(),
    qutd: integer('qutd').notNull(),
    somaProduto: real('soma_produto').notNull(),
    frete: real('frete').notNull(),
    prazo: prazoEnum('prazo').notNull(),
    desconto: real('desconto'),
    descontoMaximo: real('desconto_maximo').notNull(),
    pagamento : pagamentoEnum('pagamento').default('pix'),
    valorTotalVenda: real('valor_total_venda'),
    // campos pedidos 
    userId: uuid('user_id'),
    aprovado: boolean("aprovado"),
    gerenteId: uuid('gerente_id'),
});

export const pedidosRelations = relations(pedidos, ({ one }) => ({
    user: one(users, {
      fields: [pedidos.userId],
      references: [users.id],
      relationName: 'pedido_user_id'
    }),
    gerente: one(users, {
        fields: [ pedidos.gerenteId],
        references: [users.id],
        relationName : 'pedido_gerente_id'
      }),
  }));

export const vendas = pgTable('vendas',{
    id: uuid('id').defaultRandom().primaryKey(),
    sku: text('sku').references(()=>products.sku, {onDelete: 'cascade'}).notNull(),
    qutd: integer('qutd').notNull(),
    somaProduto: real('soma_produto').notNull(),
    frete: real('frete').notNull(),
    prazo: prazoEnum('prazo').notNull(),
    desconto: real('desconto'),
    descontoMaximo: real('desconto_maximo').notNull(),
    pagamento : pagamentoEnum('pagamento').default('pix'),
    valorTotalVenda: real('valor_total_venda'),
    userId: uuid('user_id')
    
});

export const vendasRelations = relations(vendas, ({ one }) => ({
    user: one(users, {
      fields: [vendas.userId],
      references: [users.id],
    }),
  }));