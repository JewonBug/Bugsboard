// 초기 세팅

const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const port = 3000;

// Db 연결
const connect = require("./schemas");
connect();

// URL 로그 보여주는 미들웨어
const requestMiddleware = (req,res,next) => {
    console.log("Request URL:",req.originalUrl," - ", new Date());
    next();
};


app.use(requestMiddleware);
app.use(express.json());
app.use(express.urlencoded(false));
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(false));


const boardRouter = require("./routes/board");
app.use("/api",boardRouter)

// 메인페이지 게시글
app.get("/", (req,res) => {
    res.render("./board");
});

// 글쓰기 페이지
app.get("/write", (req,res) => {
    res.render("./write");
});

// 서버 실행 
app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!");
});
