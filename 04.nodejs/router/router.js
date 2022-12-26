const { response, request } = require("express");
const express = require("express"); 

const router = express.Router();        // express 갖고있는 기능 중 router기능 사용하기 


router.get("/plus", function(request, response) {     //plus 라우터 기능정의 및 등록 
    console.log("/plus 라우터 호출 ")

    //사용자가 보낸 num1,num2 출력해 보기 
    console.log(request.query.num1+request.query.num2);       // 문자로 인식 -> 숫자로 인식하려면~~~ parseInt
    console.log(parseInt(request.query.num1)+parseInt(request.query.num2));

    //웹 브라우저에 출력 = respose
    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    response.write("<html>")
    response.write("<body>")
    response.write("응답성공<br>")
    response.write("결과값: " + (parseInt(request.query.num1)+parseInt(request.query.num2)));
    response.write("</body>")
    response.write("</html>")

    response.end(); 
});

router.get("/cal", (request, response) => {     // cal 라우터 기능 정의 및 등록 
    // 1. 사용자가 입력한 값을 가져오기; 
    let num1 = request.query.num1;
    let num2 = request.query.num2;
    let cal = request.query.cal;

    console.log(num1 + cal + num2);

    //사용자가 입력한 기호에 맞는 연산결과값을 브라우저에 출력하시오. 
    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});   // html 출력
    response.write("<html>")
    response.write("<body>")
    
    if (cal == "+") {
        response.write("결과값 : " + (parseInt(num1)+parseInt(num2)));
    } else if (cal == "-") {
        response.write("결과값 : " + (parseInt(num1) - parseInt(num2)));
    } else if ( cal == "*") {
        response.write("결과값 : " + (parseInt(num1) * parseInt(num2)));
    } else {
        response.write("결과값 : " + (parseInt(num1) / parseInt(num2)));
    }

    response.write("</body>")
    response.write("</html>")

    response.end(); 
    
})


router.post("/Grade", (request, response) =>  {
    // html 에서 내가 보낸 방식( get/post )으로 작성 해야 함 
    console.log("이름 : " + request.body.name);
    console.log("자바 : " + request.body.java);
    console.log("웹 : " + request.body.web);
    console.log("IoT : " + request.body.iot);
    console.log("안드로이드 : " + request.body.android);
    // post방식은 패킷 방식으로 데이터를 전송하기 때문에 query를 쓰지 않음 -> post = 패킷 body 부분에 넣어서 보냄 

    let avg = (parseInt(request.body.java) + parseInt(request.body.web) + parseInt(request.body.iot) + parseInt(request.body.android))/4 ;
    console.log("avg : " + avg);


    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});   // html 출력
    response.write("<html>")
    response.write("<body>")

    response.write("이름 : " + request.body.name + '<br>');
    response.write("자바 : " + request.body.java  + '<br>');
    response.write("웹 : " + request.body.web + '<br>');
    response.write("IoT : " + request.body.iot + '<br>');
    response.write("안드로이드 : " + request.body.android + '<br>');
    response.write("avg :" + avg + '<br>')

    if (95<= avg) {
        response.write("grade : A+")
    } else if (90 <= avg) {
        response.write("grade : A")
    } else if (85 <= avg) {
        response.write("grade : B+")
    } else if (80 <= avg) {
        response.write("grade : B")
    } else if (75 <= avg) {
        response.write("grade : C")
    } else {
        response.write("grade : F")
    }; 
    
    response.write("</body>")
    response.write("</html>")

    response.end(); 
})

router.post("/Join", (request, response) => {

    // let id = request.body.id
    // let pw = request.body.pw
    // let name = request.body.name
    // let gender = request.body.gender
    // let hobby = request.body.hobby

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});   // html 출력
    response.write("<html>")
    response.write("<body>")

    response.write("ID : " + request.body.id  + '<br>');
    response.write("PW : " + request.body.pw + '<br>');
    response.write("NAME : " + request.body.name + '<br>');
    response.write("EMAIL: " + request.body.email + '<br>');
    response.write("TEL: " + request.body.tel + '<br>');
    response.write("GENDER : " + request.body.gender + '<br>');
    response.write("HOBBY : " + request.body.hobby + '<br>');
    response.write("BIRTH : " + request.body.birth + '<br>');
    response.write("COLOR : " + request.body.color + '<br>');
    response.write("COUNTRY: " + request.body.country + '<br>');
    response.write("TALK : " + request.body.talk);


    response.write("</body>")
    response.write("</html>")

    response.end(); 
})



module.exports = router;   // 이 파일을 외부에서 사용할 수 있도록 내보내기 