const express = require("express");
const axiosurl = express.Router();
const mysqlrouter = require("./datasend");

axiosurl.use(express.json());
axiosurl.use(express.urlencoded({ extended: true }));

// marketData(id)
// /api?tablenm=markerData -> markerData 테이블 전부
// /api?tablenm=markerData&id=1 -> 1번 markerdData 데이터만
// /api?tablenm=markerData&w=i -> markerData 테이블에 데이터를 넣겠다
// /api?tablenm=markerData&id=1&w=i -> markerData 테이블의 1번 글을 수정

axiosurl.post("/", (req, res, next) => {
  const tablenm = req.query.tablenm ? req.query.tablenm : "";
  const id = req.query.id ? req.query.id : "";
  const w = req.query.w ? req.query.w : "";

  if (w == "") {
    req.body.crud = "select"
    next("route")
  } else if (w == "u") {
    req.body.crud = "update"
    next("route")
  } else if (w == "i") {
    req.body.crud = "insert"
    next("route")
  } else if (w == "d") {
    req.body.crud = "delete"
    next("route")
  } else {
    res.send("라우터 세팅안됨")
  }

})

axiosurl.use("/", mysqlrouter)

module.exports = axiosurl;