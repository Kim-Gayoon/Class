// random number로 10보다 크고 100보다 작은 두개의 정수가 주어진다.
// 두 숫자의 공약수를 세트 형태로 구하도록 프로그램을 작성하라.

let firstInt = Math.floor(Math.random() * 89) + 11
let secondInt = Math.floor(Math.random() * 89) + 11

let getDivisor = function (int) {
    arr = []
    for (let i = 1; i <=int; i++) {
        if (int%i == 0) {
            arr.push(i)
        }
    }
    return arr
}

let firstDivisor = getDivisor(firstInt)
let secondDivisor = getDivisor(secondInt)

console.log(`첫번째 정수 :${firstInt}, 두번째 정수 :${secondInt}`)
console.log(`${firstInt}의 약수: `, firstDivisor)
console.log(`${secondInt}의 약수: `, secondDivisor,'\n')
console.log('공약수:', firstDivisor.filter(it => secondDivisor.includes(it)))