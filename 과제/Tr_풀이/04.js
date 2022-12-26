// 다음 배열에서 제조사(manufacturer), 모델명(model)을 분리해서 별도의 배열을 각각 만들기 
// const cars = ['buick skylark 320', 'plymouth satellite', 'amc rebel sst', 'ford torino'];



const cars = ['buick skylark 320', 'plymouth satellite', 'amc rebel sst', 'ford torino'];
const manufacturers = cars.map(x => x.split(' ')[0]);
console.log(manufacturers);
//const models = cars.map(x => x.split(' ').slice(1).join(' '));    // 배열
const models = cars.map(x => x.substring(x.indexOf(' ')+1));        // 문자열
console.log(models);