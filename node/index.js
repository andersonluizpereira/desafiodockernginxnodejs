const express = require("express");
const faker = require("faker");
const app = express();
const port = 3001;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
var connection = mysql.createConnection(config);

var sql = `CREATE TABLE IF NOT EXISTS nodedb.people (
    id INT auto_increment NOT NULL,
    name varchar(100) NULL,
    PRIMARY KEY (id)
)
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;`;

connection.query(sql);
connection.end();

app.get("/", (req, res) => {
  connection = mysql.createConnection(config);
  sql = `INSERT INTO nodedb.people (name) VALUES('${faker.internet.userName()}');`;
  connection.query(sql);
  connection.end();

  connection = mysql.createConnection(config);
  sql = `SELECT name FROM nodedb.people;`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.send(`<h1>Full Cycle Rocks!</h1> <br /> ${results.map((str) => {
        const obj = JSON.parse(JSON.stringify(str))
        return obj.name.replace(',', '') + '<br />';
      })}`);
  });

  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
