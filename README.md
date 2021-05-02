# 📖 NARUTODEX - 🏗

## Uma plataforma para procurar dados de Jutsus e Personagens de Naruto

![NARUTODEX](https://user-images.githubusercontent.com/25160385/116827680-b79ae280-ab70-11eb-97a6-35de3d43eff3.gif)

### 💥 O que é?

Como o próprio nome sugeri, NARUTODEX é uma espécie de [Pokédex](https://pokemon.fandom.com/pt-br/wiki/Pok%C3%A9dex) do universo Naruto. Nela você pode Encontrar Técnicas e Personagens da franquia, bem como suas informações. É possível descobrir os Justsus de um Personagem ou os Personagens que executam determinada técnica. Além disso as técnicas têm os selos utilizados para a sua execução.

### 💡 Motivação

O foco desse projeto é adquirir e aprimorar conhecimentos com o desenvolvimento web.

As principais tecnologias abordadas aqui são/serão Node Js utilizando Express e o ORM Sequelize para o back end e Next Js no front end.

Todos os dados da plataforma são coletados do Naruto Fandom, os dados são tratados e relacionados e então providos para o front end.

Para realizar as buscas e tratamentos de dados foi criado uma CLI que possibilita fazer as ações separadamente.

Todas as informações consumidas pertencem a [Naruto Wiki](https://naruto.fandom.com/pt-br/wiki/Wiki_Naruto).

### 📦 Tecnologias

#### Front-End

Esé é um projeto [Next.js](https://nextjs.org/) inicializado com o [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [NEXT.js](https://nextjs.org/)
- [framer-motion](https://www.framer.com/motion/)
- [styled components](https://styled-components.com/)
#### Back-End
- [Express](https://expressjs.com/pt-br/)
- [sequelize ORM](https://sequelize.org/)
- [sqlite3](https://www.sqlite.org/index.html)

#### CLI
- [inquirer](https://www.npmjs.com/package/inquirer)
- [ora](https://www.npmjs.com/package/ora)
#### Hospedagem
- [heroku](https://www.heroku.com/)
- [vercel](https://vercel.com/)

### 📚 Requisitos
Ter [Git](https://git-scm.com/) para clonar o projeto.

Ter [Node.js](https://nodejs.org) instalado.

Ter [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install/) instalado.

### ⚙ Executando

#### 🚀 Começando
``` bash
  # Clonar o projeto:
  $ git clone https://github.com/lucasmg37/narutodex
  # Entrar no diretório:
  $ cd narutodex
```

#### 🔗 Iniciando back-end
```bash
  # Entrar no diretório do back-end:
  $ cd backend
  # Instalar as dependências:
  $ yarn
  # Rodar a aplicação:
  $ yarn run dev 
```

O back-end será inicializada no endereço [http://localhost:3333](http://localhost:3333).

#### 🖌 Iniciando front-end
```bash
  # Entrar no diretório do front-end:
  $ cd frontend-nextjs
  # Instalar as dependências:
  $ yarn
  # Rodar a aplicação:
  $ yarn run dev
```

O fron-tend será inicializada no endereço [http://localhost:3000](http://localhost:3000).


> ***Importante***
>
> Este repositório contém o arquivo do banco de dados já populado, portanto não é necessário executar os comandos da CLI nem executar as migrations.
> Entretanto, caso deseje iniciar o projeto com o banco novo, siga os seguintes passos.

```bash
  #Rodar as migrations
  $ yarn sequelize db:migrate
  #Executar a classic
  # $ yarn run cli start - Em andamento
```

### ⌨ CLI

A CLI, foi criada para a inserção e atualização dos dados na base de dados dos dados provenientes do Fandom.

Ela é responsável por coletar os dados das páginas (HTML) extrai-los e organiza-los de maneira relacional no banco de dados.

Para executar a CLI execute o seguinte comando em seu terminal estando na pasta ***backend***.

```bash
  # Inicia a CLI
  $ yarn run cli start
```

> ***Importante***
>
> A CLI não está totalmente criada, portanto não é possível executar todas funções necessárias. Opte por usar o banco vesionado no projeto.

### 🤝 Colabore

Viu algo de errado e quer ajudar? Pensou em algo bacana que gostaria de implementar?

Fique a vontade para abrir uma issue ou um Pull Request para o projeto. Conto com a sua ajuda.

### ✔️ To Do

- [X] Estrutura inicial back end

- [X] Coletar dados do Fandom

- [X] Organizar dados coletados

- [X] Criar endpoints para front-end

- [X] Criar estrutura Next

- [X] Criar tela principal com listagem de jutsus em forma de card

- [X] Criar tela de busca

- [X] Criar card de personagem

- [ ] Finalizar CLI para busca e tratamento de dados

- [ ] Adicionar Elementos dos Justsus

- [ ] Adicionar Clã e Habilidades dos Personagens


Feito com ❤️ e ☕ por [Lucas Junior](https://www.linkedin.com/in/lucas-junior/) 👋🏻