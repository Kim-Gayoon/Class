const cars = ['buick skylark 320', 'plymouth satellite', 'amc rebel sst', 'ford torino'];

let manufacturer = cars.map((item) => {
    return item.split(' ')[0]; // 요소마다 return 한다.
});

let model = cars.map((item) => {
    return item.split(' ').slice(1).join(' ') // 요소마다 return 한다.
});

console.log('제조사: ', manufacturer)
console.log('모델: ', model)