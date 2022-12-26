const express = require("express");
const Sessionrouter = express.Router();

Sessionrouter.get("/sessionCreate", (request, response) => {

    //session 생성 
    request.session.user = {
        "id" : "smart",
        "pw" : "123", 
        "nick" : "smart"
    }; 

    response.end(); // 꼭 들어가 줘야 한다~~~ 
})

Sessionrouter.get("/sessionSelect", (request, response) => {
    
    //session 검색 
    console.log("session에 있는 user값 : " + request.session.user); 
})

Sessionrouter.get("/sessionDelete", (request, response) => {
    
    //session 삭제
    delete request.session.user;

    response.end(); 
})

module.exports = Sessionrouter; 