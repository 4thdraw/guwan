const express = require("express");
const naviapp = express.Router();
const mysqlcontact = require("./mysqlcontact");

naviapp.use(express.json());
naviapp.use(express.urlencoded({ extended: true }));

// 포스트맨에서 확인해주세요! (post)
// 목록 localhost:8003/api?botable=markerData
// 글보기 localhost:8003/api?botable=markerData&id=1
// 글쓰기 localhost:8003/api?botable=markerData&w=i
// 글수정 localhost:8003/api?botable=markerData&id=1&w=i
// 글삭제 localhost:8003/api?botable=markerData&id=1&w=d

naviapp.post('/', (req, res, next) => {
  const botable = req.query.botable;
  const w = req.query.w ? req.query.w : "";
  // crud sql 문을 완성하기 위한 핵심변수
  const id = req.query.id ? req.query.id : "";

  if (w == "") {
    req.body.crud = "select"
    req.body.botable = botable;
    req.body.id = id;  // where 문
    next("route")
  } else if (w == "i") {
    req.body.crud = "insert"
    req.body.botable = botable;
    next("route")
  } else if (w == "u") {
    req.body.crud = "update"
    req.body.botable = botable;
    req.body.id = id;
    next("route")
  } else if (w == "d") {
    req.body.crud = "delete"
    req.body.botable = botable;
    req.body.id = id;
    next("route")
  } else {
    res.send("잘못된 접근입니다.")
  }

})

naviapp.use('/', mysqlcontact)

module.exports = naviapp;