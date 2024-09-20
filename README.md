# Gerenciador de vendas

Projeto gerenciador de vendas. O projeto tem como objetivo gerenciar vendas de bonés por meio da plataforma desenvolvida.

**Tecnologias utilizadas: ReactJS, NodeJS.**

# Guia para executar o código
- Criar os arquivos .env no formato indicado nos arquivos exmple.env;
- rodar npm i na pasta do backend e frontend
- rodar o npm run seed na pasta do backend para cadastrar os produtos
- executar o comando docker compose up -d para inicializar o banco de dados
- npm run dev na pasta do backend e frontend para abrir o projeto

# Escopo do projeto

Neste projeto existem dois níveis de usuário: gerente e vendedor. 
- O usuário vendedor pode cadastrar/visualizar vendas e pedidos. O pedido ocorre quando uma venda ultrapassa o limite de desconto, nesse caso o vendedor precisa registrar um pedido para o gerente validar. 
- O usuário gerente pode cadastrar/visualizar vendedores e também aprovar ou reprovar pedidos de cadastro de venda que ultrapassam a regra de desconto.

![image](https://github.com/user-attachments/assets/7a176270-1376-43e1-b560-b93facee9a8b)
