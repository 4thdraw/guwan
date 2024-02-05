const express = require("express");
const mysqlrouter = express.Router();
const mysql = require("mysql");
const dbinfo = require("../dbdata/dbcontact.json");

mysqlrouter.use(express.json());
mysqlrouter.use(express.urlencoded({ extended: true }));
const conn = mysql.createPool(dbinfo);
// db접속 json파일을 createPool로 연결하는 작업

mysqlrouter.post("/", (req, res) => {
  // db접속
  const crud = req.body.crud;
  const botable = req.body.botable;
  const id = req.body.id ? req.body.id : ""; // 조건적으로 발생하는 변수
  conn.getConnection((error, connection) => {
    if (error) throw console.log("DB 정보가 올바르지 않습니다 : " + error);
    // db 정보가 올바르지 않을 때 실행되는 식
    // db접속 성공 -> query문 써서 처리결과 받아야함

    if (crud == "select") {
      var selquery = id == "" ? `select * from ${botable}` : `select * from ${botable} where id=${id}`;
      connection.query(selquery, (err, result) => {
        if (err) throw "SQL문에 오류가 있습니다 :" + err + result;
        // 쿼리처리결과를 result에 저장함
        res.send(result);
      })
      connection.release();
      // 연결 반환
    } else if (crud == "insert") {
      connection.query(`INSERT INTO ${botable} (menu, description, orderdetail) VALUES
      ('Menu P', 'Description for Menu P', 'Order detail for Menu P');`, (err, result) => {
        if (err) throw "SQL문에 오류가 있습니다 :" + err + result;
        res.send(result);
      })
      connection.release();
    } else if (crud == "update") {

    } else {
      connection.query(`delete * from ${botable} where id=${id}`, (err, result) => {
        if (err) throw "SQL문에 오류가 있습니다 :" + err + result;
        // 쿼리처리결과를 result에 저장함
        res.send("삭제했습니다.");
      })
      connection.release();
      // 연결 반환
    }



  })
})

module.exports = mysqlrouter;