// random number -> 2개의 정수 (a,b)
// 첫번째 값의 범위 1~20, 두번째 값의 범위 10~30
// 첫번째 값이 두번째 값보다 4이상 작다 => a + 4 < b 
// 첫번째 정수 ~ 두번째 정수까지를 지수로 하는 2의 거듭제곱 배열 출력 (2 ** i) -> i의 범위가 a <= i <=b 
// 단, 배열의 두번째 요소와 뒤에서 두번째 요소 삭제 한 후 출력 



let list=[];
while (true) {
    let a = Math.floor(Math.random()*19)+1;
    let b = Math.floor(Math.random()*20)+10;
    if (a+4 <= b) {
        console.log(a);
        console.log(b);
        for (i=a; i<=b; i++){
            list.push(2**i);
        };
    break;
    }    
};
list.splice(1,2);
list.splice(list.length, list.length+1);

console.log(list);



// const array = [];
// // Math.random = 0~1 사이의 값을 임의로 선택 -> 두 정수의 범위 설정 
// let a = Math.floor(Math.random()*19)+1;   // 1 <= num <= 20
// let b = Math.floor(Math.random()*20)+10;  // 10 <= num2 <= 30
// if (a+4<b){                                  // <-------------------- 이렇게 하면 빈리스트가 출력될 수도 있음                 
//     console.log(a);
//     console.log(b);  
//     for (let i=a; i<=b; i++){
//         array.push(2**i);
//     }
//     array.splice(1, 2)
//     array.splice(array.length,array.length+1)
// };

// console.log(array);



/// 완전 잘못됐음..ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
// const array = [];
// let a = Math.floor(Math.random()*20)+1;   // 1 <= num <= 20
// let b = Math.floor(Math.random()*20)+10;  // 10 <= num2 <= 30

// while (true){ 
//     let a = Math.floor(Math.random()*19)+1;   // 1 <= num <= 20
//     let b = Math.floor(Math.random()*20)+10;
//     if (a+4 < b) {                          
//         console.log(a);
//         console.log(b); 
//         break; 
//     }
//     for (let i=a; i<=b; i++){
//         array.push(2**i);
//     }
//     array.splice(1, 2)
//     array.splice(array.length,array.length+1)    
// }

// console.log(array);