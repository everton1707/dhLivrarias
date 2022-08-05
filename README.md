# PROJETO INTEGRADOR - DIGITAL HOUSE

Grupo_04

## OBJETIVO

DH LIVRARIAS é um projeto de e-commerce de livraria - Nicho Sebo, onde foram definidos conceitos como MVC, controle de definições, criptografia de criptografias, envio de e-mails, upload de imagens, validações back e front end, animações, dentre outros.

## Funcionalidades

- [X] Cadastro de usuários.
- [X] Realização de pedidos.
- [X] Carrinho de compras.
- [X] Buscar produtos.
- [X] Upload de imagems com Multer.
- [X] Páginas dinâmicas com Nunjucks.
- [X] Banco de dados PostgreSQL.
- [X] Sistema de login e recuperação de senha.
- [X] Animações com Lottie.


 ## Tecnologias e Ferramentas

As seguintes tecnologias foram utilizadas no desenvolvimento do projeto:

- [HTML](https://devdocs.io/html/)
- [CSS](https://devdocs.io/css/)
- [JavaScript](https://devdocs.io/javascript/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [NodeJS](https://nodejs.org/en/)
- [Nodemailer](https://nodemailer.com/about/)
- [Express](https://expressjs.com/)
- [Express Session](https://github.com/expressjs/session)
- [Multer](https://github.com/expressjs/multer)
- [PostgreSQL](https://www.postgresql.org/)
- [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- [Faker.js](https://github.com/Marak/Faker.js)
- [Lottie](https://airbnb.design/lottie/)


## Instalação e Uso

Para rodar a aplicação, você precisa instalar o [Node](https://nodejs.org/en/) e o banco de dados [Postgres](https://www.postgresql.org/).

Siga os passos abaixo:

```bash
# Abra um terminal e copie este repositório com o comando
$ git clone https://github.com/MatheusSevero07/DH_LIVRARIAS.git
# ou use a opção de download.

# Entre na pasta com 
$ cd DH_LIVRARIAS

# Instale as dependências
$ npm install

# Crie o banco de dados e as tabelas utilizando os comandos
# inclusos no arquivo "database.sql".
    
# Conexão com o banco de dados:
# Abra e edite o arquivo "db.js" dentro da pasta "src/config"
# com o seu user e password do Postgres.

# Popule o banco de dados usando o aquivo "seed.js":
$ node seed.js

# Rode a aplicação
$ npm start
```

**Importante:** Cuidado ao alterar/excluir a imagem de placeholder da pasta `plublic/images`, pois os produtos gerados pelo `seed.js` compartilham esse arquivo entre si.

## Membros

- [Everton Lima](https://github.com/everton1707) 
- [Mariana Arcine](https://github.com/MarianaArcine)
