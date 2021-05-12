#Rode o comando 
docker-compose up -d --build

#Entre no container
docker exec -it db /bin/bash

#Depois crie a tabela
use nodedb;

#Cole o script abaixo;
CREATE TABLE IF NOT EXISTS nodedb.people (
 	id INT auto_increment NOT NULL,
 	name varchar(100) NULL,
     PRIMARY KEY (id)
)
 DEFAULT CHARSET=latin1
 COLLATE=latin1_swedish_ci;