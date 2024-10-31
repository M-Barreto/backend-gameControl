# Backend jogos em Node.js

Este é um projeto básico em Node.js que utiliza o Nodemon para reiniciar automaticamente o servidor durante o desenvolvimento.

## Pré-requisitos

- Node.js instalado
- NPM ou Yarn instalado
- MySQL rodando na máquina

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/lucassousaan/back_jogos.git
    cd seu-repositorio
    ```

2. Instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    ```

3. Criar arquivo .env

O arquivo `.env` gerencia todas as variáveis de ambiente. O `.env` é um arquivo oculto que permite personalizar variáveis de ambiente usando a sintaxe `VARIÁVEL_AMBIENTE=VALOR`. Essas variáveis são carregadas usando o módulo `dotenv` já instalado na etapa anterior.

O arquivo `.env` pode ser definido em diferentes estágios do ambiente (desenvolvimento / homologação / produção).

Crie o arquivo `.env` na raiz do projeto, copie as seguintes linhas e atualize o arquivo com o valor das respectivas variáveis:

```plaintext
HOST=nome_host
DB_USER=nome_usuario_bd
DB_PASS=senha_bd
DB_DATABASE=nome_do_bd
PORT=numero_porta
SECRET=segredo
```

## Uso

Para iniciar o servidor com o Nodemon, utilize o seguinte comando:

```bash
npm run start
# ou
yarn start
```

## Dependências

1. **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: Biblioteca para criptografia de senhas.
2. **[cors](https://www.npmjs.com/package/cors)**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
3. **[dotenv](https://www.npmjs.com/package/dotenv)**: Carrega variáveis de ambiente a partir de um arquivo `.env`.
4. **[express](https://www.npmjs.com/package/express)**: Framework web para Node.js.
5. **[express-session](https://www.npmjs.com/package/express-session)**: Middleware para gerenciar sessões na aplicação Express.
6. **[knex](https://www.npmjs.com/package/knex)**: SQL query builder para Node.js.
7. **[mysql2](https://www.npmjs.com/package/mysql2)**: Driver para conexão com MySQL.
8. **[nodemon](https://www.npmjs.com/package/nodemon)**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.

Cada dependência desempenha um papel crucial para garantir que o projeto funcione de maneira eficiente e segura. Certifique-se de manter essas bibliotecas sempre atualizadas para aproveitar as últimas melhorias e correções.

