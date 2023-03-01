<h1 align='center' > 🚧 Pagou 1.0 em construção 🚧  </h1>

## 📋 Descrição  

Api de pagamentos online. Onde o cliente pode realizar transações de débito, crédito, consegue acompanhar e gerenciar seus recebíveis.

---

## 💻 Tecnologias e Conceitos

- REST APIs
- JWTs
- Node.js com Express
- TypeScript
- PostgreSQL com Prisma(ORM)
- Testes de integração com Jest
- Environment variables
- Arquitetura em camadas

---

## 🚀 Routes

```bash
POST /signup
- cria um novo usuário
- header: {}
- body: {
  "name": "Fulano da silva",
  "email": "fulano@email.com",
  "password": "minhasenha"
}

- Retorno em caso de sucesso: 
    statusCode: 201

- Retorno em caso de falho:
    Tipos enviados no body inválidos.
    statusCode: 400

    Email já cadastrado.
    statusCodo: 409

```

```bash
POST /signin
- logar com um usuário criado
- header: {}
- body: {
  "email": "fulano@email.com",
  "password": "minhasenha"
}

- Retorno em caso de sucesso:
- statusCode: 200
- body: {
  "name": "Claudia Corrêa",
  "email": "claudia@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.      eyJ1c2VySWQiOjE0LCJpYXQiOjE2Nzc3MTMxMDN9.QpDVfyKoXvUouLLiDCRG2WeoBkA2c5PLlz9TeE15Yg4"

}

- Retorno em caso de falha: 
- statusCode: 401
- body: {
  "name": "InvalidCredentialsError",
  "message": "email or password are incorrect"
}
```

## Pré-requisitos

Antes de começar, você vai precisar ter instalado as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e o banco de dados [PostgreSQL](https://www.postgresql.org/)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

## 🎲 Rodando a API.

```bash
# Clone esse repositório 
$ git clone <https://github.com/PauloGabrieel/pagou>

# Acesse a pasta do projeto no terminal/cmd
$ cd pagou 

# Instale as dependências
$ npm install 

# Nesse repositório tem um arquivo .env.example, arquivo para você utilizar como exemplo para configurar seus .envs

# execute a aplicação em modo de desenvolvimento 
$ npm run dev

# A aplicação iniciará  na porta:4000 - acesse <http://localhost:4000>
```

### Rodando os testes

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd pagou

# instale as dependências 
$ npm install

# Para testar todas as rotas execute o script de tests
$ npm test

# Para testar uma determinada rota, execute o script de teste mais o nome da rota
$ npm test transactions
```


Autor
---

 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/PauloGabrieel" width="100px;" alt=""/>
 <br />
 <sub><b>Paulo Gabriel</b></sub> 💻


Feito com muita dedicação!

 [![Linkedin Badge](https://img.shields.io/badge/-Paulo-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/paulogabrieldev/)](https://www.linkedin.com/in/paulogabrieldev/) 
[![Gmail Badge](https://img.shields.io/badge/-gabrieeel.c@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabrieeel.c@gmail.com)](mailto:gabrieeel.c@gmail.com)

