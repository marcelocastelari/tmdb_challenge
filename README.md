# TMDB Challenge

## Objetivo

A finalidade desse projeto cadastrar usuários na plataforma, e disponibilizar um serviço de pesquisa onde iremos consumir a API do tmdb: https://developer.themoviedb.org/reference/intro/getting-started. A partir de então o usuário terá a possibilidade adicionar os filmes a suas listas de: Favoritos, Assistidos ou Assistir mais tarde.

Os dados do usuário são salvos no banco de dados assim como alguns dados específicos dos filmes, pois as listas de preferencia do usuário precisam ser persistidas.

## Pré Requisitos

![Node](https://img.shields.io/badge/Node-19.7.0-brightgreen)

![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

# Importante

Para que a api que faz a busca aos filmes (https://developer.themoviedb.org/reference/intro/getting-started) funcione, é necessário ter a **API_KEY** fornecida aos desenvolvedores cadastrados no referido site.

A **API_KEY** pode ser passada pelos environments do **docker-compose.yml - [service - frontend]** ou via arquivo **.env**

## Setup do Projeto

### Rodar todo o projeto via Docker:
```
docker compose up
```

### Para desenvolvimento
``` 
cd backend/db docker compose up
cd backend npm install
cd frontend npm install
```

## Envs

### As Envs podem ser passadas via docker-compose como environments:

```
environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PORT=3306
      - DB_USER=root
      - DB_PASS=root
      - DB_NAME=movies
```

### E também podem ser passadas via arquivo .env. No projeto existe o arquivo:
```
.env.example
```

Que pode ser renomeado para .env e configurado da maneira em que achar melhor.

### Rodando localmente o endereço será:

```http
localhost:8000/
```

## Testes
### Rodar testes unitários backend
```
cd banckend
npm run test:unit
```

### Rodar testes de integração backend
```
cd banckend/db 
docker compose up
cd ..
npm run test:integration
```

### Rodar testes unitários frontend
```
cd frontend
npm test
```


## Documentação da API

### Cadastro
```http
  POST /auth/register
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**.  |
| `password`      | `string` | **Obrigatório**. 

### Login
```http
  POST /auth/login
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**.  |
| `password`      | `string` | **Obrigatório**. 

### Busca os filmes pelo tipo da lista
```http
  GET /userMovieList/:listType
```

```
localhost:8000/userMovieList/favorite
```


### Adiciona um novo filme na lista
```http
  POST /userMovieList/add
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID do filme **Obrigatório**.  |
| `title`      | `string` | Titulo **Obrigatório**. 
| `overview`      | `string` | Breve descrição  **Obrigatório**.
| `releaseDate`      | `string` | Data de lançamento  **Obrigatório**.
| `posterPath`      | `string` | Caminho para capa do filme  **Obrigatório**.
| `listType`      | `string` | Tipo da lista  **Obrigatório**.

```
{
    "movie": {
        "id": 123,
        "title": "batman",
        "overview": "batman vs pinguim",
        "releaseDate": "2002-05-19",
        "posterPath": "url"
    },
    "listType": "favorite"
}
```

### Remove um filme da lista
```http
  DELETE /userMovieList/remove
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID do filme **Obrigatório**.  |
| `listType`      | `string` | Tipo da lista **Obrigatório**. 

```
{
    "movieId": 2658,
    "listType": "favorite"
}
```