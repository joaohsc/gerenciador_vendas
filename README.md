# Gerenciador de vendas

Projeto gerenciador de vendas. O projeto tem como objetivo gerenciar vendas de bonés por meio da plataforma desenvolvida. Existem dois níveis de usuário:
- Gerente: cadastra "usuário vendedor"; visualiza/aprova vendas e solicitações;
- Vendedor: cadastra/visualiza vendas e pedidos(solicitação); Lista vendas e pedidos;

Tecnologias utilizadas: ReactJS, NodeJS.

# Guia para executar o código
- Criar os arquivos .env no formato indicado nesse readme;
- rodar npm i na pasta do backend e frontend
- rodar o npm run seed na pasta do backend para cadastrar os produtos
- executar o comando docker compose up -d para inicializar o banco de dados
- npm run dev na pasta do backend e frontend para abrir o projeto

Exemplo de .env frontend:
- VITE_API_URL =  "http://localhost:port"

Exemplo de .env backend:
- DATABASE_URL=""
- DB_USER=""
- DB_PASSWORD=""
- JWT_PASS = "" 

