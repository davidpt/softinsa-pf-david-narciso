# Softinsa - Projeto final - David Narciso &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)

Aplicação web criada para demonstrar os conhecimentos adquiridos durante a formação.

## Sobre a alicação web

* Frontend - ReactJS, mais especificamente create-react-app (CRA)
* Backend - Spring Boot
* DB - MongoDB

Através do ficheiro docker-compose.yml são criados três containers:

* mongo-db - Um container com a imagem mongo:6.0.1 que serve como base de dados
* mongo-admin-interface - Um container com a imagem mongo-express:1.0.0-alpha que serve para podermos ver os registos da base de dados
* spring-react-container - Um container com uma imagem personalizada que inclui o nosso frontend e backend
