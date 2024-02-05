const express = require("express");
const mysql = require("mysql");
// mysql연결할 것이다
const apiRouter = express.Router();
const mysqlcontact = require("../mysqlcontact");

// ~~~.cafe24app.com/data/notice
// ~~~.cafe24app.com/data/gallery

// 내보낼 때
apiRouter.use(express.json())
// 받을 때
apiRouter.use(express.urlencoded({ extended: true }))
// query방식은 윗라인 명령이 꼭 있어야 읽을 수 있다.
// params방식은 윗라인 명령이 없어도 된다.

// apiRouter.post("/:tablenm/:wid/:w", (req, res, next) => {
//   // /api/galerry/10/u?subject=바꿀꺼

//   const botable = req.params.tablenm;
//   const wid = req.params.wid;
//   const w = req.params.w;

//   if (w !== "") {
//     req.body.crud = "select"; // crud
//     req.body.botable = botable; // table이름
//     req.body.id = wid; // pk
//     next("route")
//   } else if (w === "u") {
//     req.body.crud = "update"; // crud
//     req.body.botable = botable; // table이름
//     req.body.id = wid; // pk
//     next("route")
//   } else if (w === "i") {
//     req.body.crud = "insert"; // crud
//     req.body.botable = botable; // table이름
//     next("route")
//   } else if (w === "d") {
//     req.body.crud = "delete"; // crud
//     req.body.botable = botable; // table이름
//     req.body.id = wid; // pk
//     next("route")
//   } else {
//     res.send("올바르지 않은 query입니다.")
//   }
// })

apiRouter.post("/", (req, res, next) => {
  //   // 리액트 요청할 때 post하면 대응해줄게
  //   // localhost:8003/api?bo_table=gallery

  //   // req( 리액트 useState 변수 비워두기, useEffect axios 실행 ) -> res( 노드 )

  //   // req( 리액트 주소 queryString, params ) ->
  //   // next( 나의 특정변수 추가해서 넘길 때 ) ->
  //   // 다음라우터( mysql 라우터 ) -> req( 나의 특정변수 접수 ) -> 
  //   // 노드 -> res( 전송 ) -> 리액트( then(변수) -> 변수.data )
  //   // req.query ( get: 주소창 ), req.body ( post: 글쓰기 )

  //   // req.body ( post: 글쓰기 postman으로 확인하기 )

  //   // 목록 /api?bo_table=gallery  상세보기 /api?bo_table=gallery&wid=10
  //   // 수정 /api?bo_table=gallery&wid=10&w=u
  //   // 삽입 /api?bo_table=gallery&w=i
  //   // 삭제 /api?bo_table=gallery&wid=10&w=d

  const botable = req.query.botable;
  const wid = req.query.wid;
  const w = req.query.w // update

  if (w == "" && botable !== undefined) {
    req.body.crud = "select"; // crud
    req.body.botable = botable; // table이름
    req.body.id = wid; // pk
    next("route")
  } else if (w === "u") {
    req.body.crud = "update"; // crud
    req.body.botable = botable; // table이름
    req.body.id = wid; // pk
    next("route")
  } else if (w === "i") {
    req.body.crud = "insert"; // crud
    req.body.botable = botable; // table이름
    next("route")
  } else if (w === "d") {
    req.body.crud = "delete"; // crud
    req.body.botable = botable; // table이름
    req.body.id = wid; // pk
    next("route")
  } else {
    res.send("올바르지 않은 query입니다.")
  }
})

apiRouter.use("/", mysqlcontact)

// apiRouter.use("/", (req, res) => {
//   res.send(`받았습니다. ${req.query.crud} ${req.query.botable}`)
// })


module.exports = apiRouter;
// 일반 라우터 만드는 방법

