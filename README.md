Este projeto foi criado com o client [Create React App](https://github.com/facebook/create-react-app).

## Sobre o Projeto

Este projeto visa demonstrar o funcionamento básico do Redux com o middleware Thunk. O objetivo é também demonstrar a estrutura do duck pattern.

Trata-se de um sistema básico de busca de repositórios do GitHub para adicionar a uma lista personalizada.

O usuário deve inserir o username e o nome do repositório e aguardar o resultado da chamada API.

Feito isso, ele terá as opções de limpar a busca ou adicionar o resultado à sua lista de repositórios, bem como acessar o link direto para o repositório pesquisado.

Uma vez na lista, o usuário poderá remover o(s) item(ns) adicionado(s), além de também poder acessar o link para o repositório.

**O que é duck pattern?** -> é um padrão de organização de código que visa implementar action creators, states e reducers em um único arquivo de forma a facilitar a escalabilidade do Redux.

**Redux Thunk Middleware** -> é uma biblioteca que permite utilizar funções assíncronas (ex.: chamada API) dentro do Redux, sendo responsável por realizar os dispatches como callbacks.

## Executando o Projeto

Certifique-se de possuir o Node instalado na sua máquina. Se não possuir, [baixe-o aqui](https://nodejs.org/pt-br/download/).

A versão do Node deve ser superior à **8.10** e do NPM superior à **5.6**

Baixe ou clone o projeto deste repositório.

Feito isso, acesse a pasta do projeto e execute o comando ```npm install``` e aguarde as dependências serem instaladas.

Agora, rode ```npm start```, aguarde o início do app e aproveite!
