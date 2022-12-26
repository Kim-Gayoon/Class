
const express = require("express"); 

const conn = require('../config/DBConfig.js');

const DBrouter = express.Router();  


DBrouter.post("/Login", (request, response) => {

    let id = request.body.id
    let pw = request.body.pw

    let sql = "select * from member where id=? and pw=?";
    // DB에 실질적으로 명령을 내리는것 = query
    conn.query(sql, [id, pw], (err,row) => {            
        if(err) {
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            // 검색 데이터o => 로그인 성공
            // response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginS.html")
        
            request.session.user = id;   // session에 저장시키기 

            console.log("session영역에 id저장 성공" + request.session.user); 

            /* LoginS.html -> ejs로 변환하시오. 
                1. LoginS.html을 ejs파일로 변경하여 views 이동
                2. Login 라우터에서 LoginS.ejs 파일을 랜더링
                3. 랜더링할 때 로그인에 성공항 id값을 전송
                4. ejs 파일에서 로그인에 성공한 id값을 출력   */
            response.render("LoginS", {
                id_name : id
            })
            
        }else if(row.length == 0) {
            // 검색 데이터x -> 로그인 실패
            response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html")
        }   
    })



    // 사용자가 입력한 id가 'smart'이고 pw가 '123'이였을때, 
    // 성공 -> LoginS.html 
    // 실패 -> LoginF.html 

    // if (id=='smart' && pw=='123') {
    //     response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginS.html")
    // } else {
    //     response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html");
    // }

//    response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginS.html");
   //redirect = url 페이지로 이동
})

DBrouter.post("/JoinDB", (request, response) => {

    
    let id = request.body.id;
    let pw = request.body.pw;
    let nick = request.body.nick;

    let sql = "insert into member values(?,?,?)";
    // DB에 실질적으로 명령을 내리는것 = query
    conn.query(sql, [id, pw, nick], (err,row) => {      // [id, pw, nick] = 위 (?,?,?) 순서 
        if(!err) {
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Main");  //Main라우터 호출 
        }else {
            console.log("입력실패 : " + err);
        }

    })

})

//회원 삭제 라우터 만들기 
// 1. get방식의 /Delete라우터 생성
// 2. 사용자가 입력한 id값 가져오기
// 3. id값을 통해 member테이블에 있는 id값 삭제하기
// 4. 삭제 성공 후 Main.html 로 돌아가기 
DBrouter.get("/Delete", (request, response) => {

    let id = request.query.id;

    let sql = "delete from member where id=?";

    conn.query(sql, [id], (err,row) => {    
        // if(row.affectedRows>0) {
        //     console.log("명령에 성공한 수: " + row.affectedRows);
        //     response.redirect("http://127.0.0.1:5500/mynodejs/public/ex06Main.html");
        // }else if(row.affectedRows==0) {
        //     console.log("삭제된 값이 없습니다.")
        // }else {
        //     console.log("삭제실패 : " + err);
        // }

        if(err) {
            console.log("삭제실패 : " + err);
        } else if(row.affectedRoews > 0){
            console.log("명령에 성공한 수: " + row.affectedRows);
            response.redirect("http://127.0.0.1:3001/Main");  //Main라우터로 호출하기 
        } else if(row.affectedRows==0) {
            console.log("삭제된 값이 없습니다.")
        }    
    
    })
})

DBrouter.post("/Update", (request, response) => {

    // 사용자가 입력한 id의 pw를 변경하고 
    // 성공 후 Main. html 페이지로 이동하시오. 

    let id = request.body.id;
    let select = request.body.select;    // pw or nick
    let data = request.body.data;        // 변경될 데이터 

    // UPDATE [테이블이름] SET [변경할 데이터 변경할 값]  WHERE [변경 데이터?]

    let sql = `update member set ${select}=${data} where id=${id}`;

    // let sql = " "
    // if (select == "pw") {
    //     sql = "update member set pw=? where id=?"
    // } else if (select =="nick") {
    //     sql = "update member set nick=? where id=?"
    // }

    conn.query(sql, (err,row) => {    
        if(err) {
            console.log("수정실패 : " + err);
        } else if(row.affectedRows > 0){
            console.log("명령에 성공한 수: " + row.affectedRows);
            response.redirect("http://127.0.0.1:3001/Main");  //Main라우터 호출하기 
        } else if(row.affectedRows==0) {
            console.log("수정된 값이 없습니다.")
        }    
    })
})

DBrouter.get("/SelectAll", (request, response) => {    // post는 post라고 지정을 해야만 갈 수있음 
    let sql = "select * from member";

    // DB에 실질적으로 명령을 내리는것 = query
    conn.query(sql, (err,row) => {            
        if(err) {
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            console.log("검색된 데이터의 수 : " + row.length);

            response.render("SelectAll", {
                row_names : row
            })

           /*  response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});   // html 출력
            response.write("<html>")
            response.write("<body>")
            response.write("<table border='1'>")    // table border = 표의 선 그리기 
            response.write("<tr>")    //table = tr, td 가 존재 해야 함
            response.write("<th>ID</th>")
            response.write("<th>PW</th>")
            response.write("<th>NICK</th>")
            response.write("</tr>")
            
            for(let i=0; i<row.length; i++) {
                response.write("<tr>")
                response.write("<td>"+row[i].id+"</td>");
                response.write("<td>"+row[i].pw+"</td>");
                response.write("<td>"+row[i].nick+"</td>");
                response.write("<td><a href='http://127.0.0.1:3001/SelectDelete?id="+row[i].id+"'>삭제</a></td>");
                // querystring = 
                response.write("</tr>")
            }

            response.write("</table>")
            response.write("</body>")
            response.write("</html>")

            response.end();  */

        }else if(row.length == 0) {
            console.log("검색된 데이터가 없습니다.");
        }   
    })

})

//회원검색 라우터만들기 
//1. get방식의 /SelectOne 라우터 생성
//2. 사용자가 입력한 id의 정보만 검색해서 브라우저 출력하시오 
DBrouter.get("/SelectOne", (request, response) => {    // post는 post라고 지정을 해야만 갈 수있음 

    const id = request.query.id
    let sql = "select * from member where id=?";
    // DB에 실질적으로 명령을 내리는것 = query
    conn.query(sql, [id], (err,row) => {            
        if(err) {
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            console.log("검색된 데이터의 수 : " + row.length);
            console.log(row);    

            response.render("SelectOne", {
                row_name : row
            })

            /* response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});   // html 출력
            response.write("<html>")
            response.write("<body>")
            response.write("<table border='1'>")    // table border = 표의 선 그리기 
            response.write("<tr>")    //table = tr, td 가 존재 해야 함
            response.write("<th>ID</th>")
            response.write("<th>PW</th>")
            response.write("<th>NICK</th>")
            response.write("</tr>")
            
            for(let i=0; i<row.length; i++) {
                response.write("<tr>")
                response.write("<td>"+row[i].id+"</td>");
                response.write("<td>"+row[i].pw+"</td>");
                response.write("<td>"+row[i].nick+"</td>");
                response.write("</tr>")
            }

            response.write("</table>")
            response.write("</body>")
            response.write("</html>")

            response.end();  */

        }else if(row.length == 0) {
            console.log("검색된 데이터가 없습니다.");
        }   
    })

})

DBrouter.get("/SelectDelete", (request, response) => {

    let id = request.query.id;

    console.log(id);

    let sql = "delete from member where id=?";

    conn.query(sql, [id], (err,row) => {    
        if(err) {
            console.log("삭제실패 : " + err);
        } else if(row.affectedRoews > 0){
            console.log("명령에 성공한 수: " + row.affectedRows);
            response.redirect("http://127.0.0.1:3001/SelectAll");
        } else if(row.affectedRows==0) {
            console.log("삭제된 값이 없습니다.")
        }    
    
    })
})

DBrouter.get("/Main", (request, response) => {
    response.render("Main", {
        id : request.session.user    //session에 id값이 없으면 null 값이 넘어감 ->null 여부만 판단해 주면 됨 
    })
})

DBrouter.get("/Logout", (request, response) => {
    
    delete request.session.user;
    
    response.render("Main", {
        id : request.session.user    //session에 id값이 없으면 null 값이 넘어감 ->null 여부만 판단해 주면 됨 
    })
})


module.exports = DBrouter;   // 이 파일을 외부에서 사용할 수 있도록 내보내기 

