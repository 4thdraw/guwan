const express = require("express");
const nodeserver = express();
const path = require("path");
const port = 8014;

const mysql = require("mysql");
const dbdata = require("./dbdata/dbcontact.json");

nodeserver.use(express.json()); // Add this middleware for parsing JSON requests

nodeserver.use(express.static(path.join(__dirname, './selfintroducepage/build')))

nodeserver.get('/',(req, res)=>{
  res.sendFile(path.join(__dirname,'./selfintroducepage/build/index.html'))
})

const sqlconnection = mysql.createPool(dbdata);

nodeserver.get("/:dbtable", (req, res) => {
  const { dbtable } = req.params;

  sqlconnection.getConnection((err, connection) => {
    if (err) throw console.log(`DB connection error: ${err}`);
    
    connection.query(`SELECT * FROM ${dbtable}`, (error, result) => {
      if (error) throw console.log(`Query execution error: ${error}`);
      
      res.send(result);
      connection.release();
    });
  });
});

nodeserver.get("/:dbtable/:id", (req, res) => {
  const { dbtable, id } = req.params;

  sqlconnection.getConnection((err, connection) => {
    if (err) throw console.log(`DB connection error: ${err}`);
    
    connection.query(`SELECT * FROM ${dbtable} WHERE id=${id}`, (error, result) => {
      if (error) throw console.log(`Query execution error: ${error}`);
      
      res.send(result);
      connection.release();
    });
  });
});

nodeserver.post("/:dbtable/mode/write", (req, res) => {
  const { dbtable } = req.params;
  const { firp, secp } = req.body;

  sqlconnection.getConnection((err, connection) => {
    if (err) throw console.log(`DB connection error: ${err}`);
    
    connection.query(`INSERT INTO ${dbtable} (firp, secp) VALUES (?, ?)`, [firp, secp], (error, result) => {
      if (error) throw console.log(`Query execution error: ${error}`);
      
      res.send(result);
      connection.release();
    });
  });
});

nodeserver.use((req, res)=>{
  res.status(404).sendFile(path.join(__dirname, './www/nopage.html'))
})

nodeserver.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});