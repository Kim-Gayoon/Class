const express = require("express");     // 설치한 express를 사용하겠다고 선언 -> 변수 선언  
const app = express();           // express 실행 -> app이란 변수에 대입  // 실행 안됨 왜?? 포트가 작성되지 않았음    // 127.0.0.1

const router = require("./router/router.js");    // 현재 파일에서 router.js 파일을 사용하겠다고 선언 
const DBrouter = require("./router/DBrouter.js");
const EJSrouter = require("./router/EJSrouter.js");
const Sessionrouter = require("./router/Sessionrouter.js")
const Messagerouter = require("./router/Messagerouter.js")


let ejs = require('ejs');  //ejs 사용하겠다~~
app.set('view engine', 'ejs')

const session = require("express-session")  // 세션기능
const mysql_session = require("express-mysql-session")      // 세션이 저장되는 영역(mysql)

let conn = {
    host : "127.0.0.1",
    user : "root",
    password : ----- ,
    port: "3306",
    database : "nodejs_db"
}


// post 방식으로 전송했을 때는 반드시 미들웨어를 등록해 줘야 한다  
const bodyparser = require("body-parser"); 

let conn_session = new mysql_session(conn);

app.use(session({
    secret : "smart",           // 비밀키 
    resave : false,             // 매번 서버에 저장할지 여부 
    saveUninitalized : true,    // 매번 실행할때 마다 서버 초기화 여부
    store : conn_session        // 저장공간 
}))  // 미들웨어로 session기능 등록  (-> 저장위치: mysql) 


app.use(express.static("./public")); 

app.use(bodyparser.urlencoded({extended:false}));   //post방식일때 body영역을 분석해 주는 미들웨어로 bodyparser등록 
// bodyparser안에서도 분석 방법이 2가지 존재함 -> 그중에서 extended:false = 기본설정으로 설정하겠음 
// bodyparser은 반드시 router등록하기 전에 등록해야 한다!!!!

app.use(router);   //  미들웨어로 router등록 -> router를 사용하겠다 
app.use(DBrouter); 
app.use(EJSrouter);
app.use(Sessionrouter); 
app.use(Messagerouter); 


app.listen(3001);   // 현재 서버파일의 port 번호 설정 (기본포트 3000번 설정) 
