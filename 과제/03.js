// random number => 두개의 정수 
// 10 <= 두개의 정수 <= 100
// 두 숫자의 공약수를 세트 형태로 구하라. 

const num1 = Math.ceil(Math.random()*89 + 10);  // 11 ~ 99
const num2 = Math.ceil(Math.random()*89 + 10);  // 11 ~ 99
const divisors1 = [];
for (let i=1; i<=num1; i++) {
    if (num1 % i == 0)
    divisors1.push(i);          // num1의 약수
}
const divisors2 = [];
for (let i=1; i<=num2; i++) {
    if (num2 % i == 0)
        divisors2.push(i);      // num2의 약수
}
console.log(num1, num2);
console.log(divisors1);
console.log(divisors2);
let cd = divisors1.filter(function(val) {
    return divisors2.includes(val);         // Boolean
});
console.log(cd);
const commonDivisors = new Set(divisors1.filter(val => divisors2.includes(val)));
console.log(commonDivisors);
console.clear();