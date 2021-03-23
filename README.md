# node_express_db_tutorial
Express API with SQLite DB (using code first/migration approach)

Knex commands:

Intall knex globally on your computer if don't have
 > npm install knex -g
 
To create the first version of knexfile.js
  > knex init
 
To create the migration
  > knex migrate:make create_lessons_table

To running migrations
  > knex migrate:latest

To rollback migrations
  > knex migrate:rollback

Heroku CLI commands:

To running the migration:
  > heroku run knex migrate:latest -a node-db-tutorial11

To inspect the SQLite database you can download a free tool on https://sqlitestudio.pl/


