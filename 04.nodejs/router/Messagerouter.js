const express = require("express");
const Messagerouter = express.Router();

/* 주의!! 잊지 말기 
    1. app.js 미들웨어 등록 
    2. conn = mysql 연결 -> DB정보 */

//DB연결
const conn = require("../config/DBConfig.js")

Messagerouter.get("/Message", (request, response) => {

    // 현재 로그인한 사람에게 온 메세지를 검색 

    let sql = "select * from web_message where rec=?"; 

    if (request.session.user) {

        conn.query(sql, [request.session.user.email], (err,row)=> {
            console.log(row); 

            response.render("message", {
                user : request.session.user,
                row_name : row
            }); 
        })
    } else {

        response.render("message", {
            user : request.session.user
        })
    }
})


Messagerouter.get("/MessageLogout", (request, response) => {
    delete request.session.user; 

    response.redirect("http://127.0.0.1:3001/Message"); 
})

Messagerouter.post("/MessageJoin", (request, response) => {
    // 회원가입기능 
    let email = request.body.email;
    let pw = request.body.pw;
    let tel = request.body.tel;
    let address = request.body.address; 

    let sql = "insert into web_member values(?,?,?,?,now())";
    // DB에 실질적으로 명령을 내리는것 = query
    conn.query(sql, [email, pw, tel, address], (err,row) => {      // [email, pw, tel, address] = 위 (?,?,?,?) 순서 
        if(!err) {
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Message");  //Message라우터 호출 
        }else {
            console.log("입력실패 : " + err);
        }

    })
})

/* Login 기능을 구현하시오
    1. message.ejs에 form 수정
    2. Message Login 라우터를 구현
    3. 로그인 성공 후 Message 페이지로 이동 */

Messagerouter.post("/MessageLogin", (request, response) => {

    let email = request.body.email
    let pw = request.body.pw
    // console.log(row);
    let sql = "select * from web_member where email=? and pw=?";
    // DB에 실질적으로 명령을 내리는것 = query
    conn.query(sql, [email, pw], (err,row) => {            
        if(err) {
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            // 검색 데이터o => 로그인 성공
        
            request.session.user = {    // session에 저장시키기 -> session에 저장할때는 저장공간이 있다는 것을 잊지 말자 
                "email" : row[0].email,
                "tel" : row[0].tel,
                "address" : row[0].address 
            };

            console.log("session영역에 email저장 성공" + request.session.user); 
            response.redirect("http://127.0.0.1:3001/Message"); 
            
        }else if(row.length == 0) {
            // 검색 데이터x -> 로그인 실패
            // response.write("<script>alert('Login Fail')</script>");
            response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html")
            // response.end();  

        }  
    }) 
})

Messagerouter.get("/MessageUpdate", (request, response) => {

    // update.ejs 파일을 랜더링 해주는 router
    
    response.render("update", {
        user : request.session.user

    })
   
})

Messagerouter.post("/MessageUpdateExe", (request, response) => {
    
    let email = request.session.user.email;  
    let pw = request.body.pw;
    let tel = request.body.tel;
    let address = request.body.address; 

    // 사용자가 입력한 pw, tell, address로 email의 정보를 수정하시오 

    let sql = "update web_member set pw=?, tel=?, address=? where email=?";
    // DB에 실질적으로 명령을 내리는것 = query
    conn.query(sql, [pw, tel, address, email], (err,row) => {      // [email, pw, tel, address] = 위 (?,?,?,?) 순서 
        if(!err) {
            console.log("수정성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Message");  //Message라우터 호출 

            request.session.user={
                "email" : email,
                "tel" : tel,
                "address" : address 
            }
        }else {
            console.log("수정실패 : " + err);
        }
    })
})

Messagerouter.get("/MessageMemberSelect", (request, response) => {

  
    let sql = "select * from web_member";
    // DB에 실질적으로 명령을 내리는것 = query
    conn.query(sql, (err,row) => {            
        if(err) {
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            console.log(row); 
            response.render("selectMember", {
                row_name : row
            }) 
        }else if(row.length == 0) {
            // 검색된 데이터가 없을 때 
            // response.write("<script>alert('Login Fail')</script>");
            response.redirect("http://127.0.0.1:3001/Message")
            // response.end();  

        }  
    }) 
})

Messagerouter.get("/MessageDelete", (request, response) => {

    let email = request.query.email;

    let sql = "delete from web_member where email=?";
   
    conn.query(sql, [email], (err,row) => {     
        if(!err) {
            console.log("삭제성공 : " + row);
            response.redirect("http://127.0.0.1:3001/MessageMemberSelect");  //Message라우터 호출 
        }else {
            console.log("삭제실패 : " + err);
        }
    })
})

Messagerouter.post("/MessageSend", (request, response) => {
    // 회원가입기능 
    let send = request.body.send;
    let rec = request.body.rec;
    let content = request.body.content;

    let sql = "insert into web_message(send,rec, content, send_date) values(?,?,?,now())";
    // DB에 실질적으로 명령을 내리는것 = query
    conn.query(sql, [send, rec, content], (err,row) => {      // [email, pw, tel, address] = 위 (?,?,?,?) 순서 
        if(!err) {
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Message");  //Message라우터 호출 
        }else {
            console.log("입력실패 : " + err);
        }

    })
})



module.exports = Messagerouter;