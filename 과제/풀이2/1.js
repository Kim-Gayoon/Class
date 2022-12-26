// random number 두 정수가 주어진다. (1~20, 10~30)
// 첫재 값은 두번째 값보다 작아야 한다. (4 이상)
// 정수1 부터 정수2 까지를 지수로 하는 2의 거듭제곱 배열을 출력하는 프로그램을 만들어라.

let firstInt = 0
let secondInt = 0

do  {
    firstInt = Math.floor(Math.random() * 19) + 1
    secondInt = Math.floor(Math.random() * 20) + 10
}   while (firstInt + 3 >= secondInt);
console.log('지수 값:', firstInt, secondInt)

let arr = []
for (let i = firstInt; i<=secondInt; i++) {
    arr.push(2**i)
}

console.log(`2^${firstInt} ~ 2^${secondInt}:`, arr)
arr.splice(1, 1)
arr.splice(-2, 1)
console.log('앞에서 두번째와 뒤에서 두번째를 뺀 것:', arr)