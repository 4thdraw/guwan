const express = require("express");
const nodeserver = express();
const path = require("path");
const port = 8003;

const mysql = require("mysql")
const dbdata = require("./dbdata/dbcontact.json")

// 라우터 끌고오는 방법
const apiRouter = require("./server/api/api");
const datain = require("./newData/routers/datain");
const navi = require("./server/navi")

nodeserver.use(express.static(path.join(__dirname, "./selfintroducepage/build")))

nodeserver.get("/", (req, res) => {
  res.send(path.join(__dirname, "./selfintroducepage/build/index.html"));
})

nodeserver.use("/api", apiRouter);
nodeserver.use("/data", datain);
nodeserver.use("/navi", navi);

const sqlconnection = mysql.createPool(dbdata);


nodeserver.post("/title/:content", (req, res) => {
  const content = req.params.content;
  const querySwitch = selectQuery(content);

  sqlconnection.getConnection((err, connection) => {
    if (err) throw console.log(`DB접속정보가 다릅니다. + ${err}`)
    connection.query(querySwitch, (error, result) => {
      if (error) throw console.log(`쿼리문을 확인하여주십시오. + ${error}`)
      res.send(result)
      connection.release();
    })
  })
})


nodeserver.post("/title/:content/:pk", (req, res) => {
  const content = req.params.content;
  const pk = req.params.pk;

  const querySwitch = selectQuery(content, pk);

  sqlconnection.getConnection((err, connection) => {
    if (err) throw console.log(`DB접속정보가 다릅니다. + ${err}`)
    connection.query(querySwitch, (error, result) => {
      if (error) throw console.log(`쿼리문을 확인하여주십시오. + ${error}`)
      res.send(result)
      connection.release();
    })
  })
})



nodeserver.post("/title/:content/:pk/:w", (req, res) => {
  const content = req.params.content;
  const pk = req.params.pk;
  const w = req.params.w;

  const querySwitch = selectQuery(content, pk, w);

  sqlconnection.getConnection((err, connection) => {
    if (err) throw console.log(`DB접속정보가 다릅니다. + ${err}`)
    connection.query(querySwitch, (error, result) => {
      if (error) throw console.log(`쿼리문을 확인하여주십시오. + ${error}`)
      res.send(result)
      connection.release();
    })
  })
})

function selectQuery(content, ...args) {
  const w = args[0];
  const pk = args.length > 1 ? args[1] : null;

  switch (w) {
    case 's':
      return pk === null ? `SELECT * FROM ${content}` : `SELECT * FROM ${content} WHERE id=${pk};`;
    case 'i':
      return `INSERT INTO ${content} (firp, secp) VALUES ('힘들었던 점2', '해결점 2');`;
    case 'u':
      return `UPDATE ${content} SET secp='해결점 1' WHERE id=${pk};`;
    // case 'd':
    //   // DELETE 쿼리에서는 pk를 사용합니다.
    //   if (pk === null) return null; // pk가 필요한 경우에 pk가 없으면 null을 반환
    //   return `DELETE FROM ${content} WHERE id=${pk};`;
    default:
      return null;
  }
}

nodeserver.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./selfintroducepage/nopage.html"))
})

nodeserver.listen(8014, () => {
  console.log("구동완료")
})