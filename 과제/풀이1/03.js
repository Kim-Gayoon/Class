/* random number로 10보다 크고 100보다 작은 두개의 정수가 주어집니다.
두 숫자의 공약수를 세트 형태로 구하도록 프로그램을 작성하세요.*/

// 공약수 = 공통된 약수 

let num = Math.floor(Math.random() * 90) + 10;
let num2 = Math.floor(Math.random() * 90) + 10;
let se = new Set();
console.log(num,num2);
for(let i =1; i<= Math.max(num,num2);i++){
    if(num % i == 0 && num2 % i ==0){
        se.add(i);
    }
}
console.log(se);




