# Como refazer a base de dados

0) Encerre o backend do projeto, feche o pgAdmin e abra novamente sem acessar a base de dados

1) npx sequelize db:drop

2) npx sequelize db:create

3) nodemon index.js 

4) No terminal irá printar "base de dados conectada" = SUCESSO

- Se possuir seeders, faça:

4) nodemon index.js

5) abra outro terminal e execute o comando abaixo

6) npx sequelize db:seed:all (quando ter seeders)
