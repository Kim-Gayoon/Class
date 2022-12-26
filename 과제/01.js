// random number -> 2개의 정수 (a,b)
// 첫번째 값의 범위 1~20, 두번째 값의 범위 10~30
// 첫번째 값이 두번째 값보다 4이상 작다 => a + 4 < b 
// 첫번째 정수 ~ 두번째 정수까지를 지수로 하는 2의 거듭제곱 배열 출력 (2 ** i) -> i의 범위가 a <= i <=b 
// 단, 배열의 두번째 요소와 뒤에서 두번째 요소 삭제 한 후 출력 


let first = Math.ceil(Math.random()*20);        // 1 ~ 20
let second = 0;
while (second < first+4) {
    second = Math.ceil(Math.random()*21 + 9);   // 10 ~ 30
}
console.log(first, second);
const powerArray = [];
for (let i=first; i<=second; i++) {
    if (i == first+1 || i == second-1)      // 앞에서 두번째, 뒤에서 두번째는 제외
        continue;
    powerArray.push(Math.pow(2, i));
}
console.log(powerArray);
console.clear()
