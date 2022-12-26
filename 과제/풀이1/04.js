/*다음 배열에서 제조사(manufacturer)와 모델명(model)을 분리해서
별도의 배열을 각각 만드세요.*/
// const cars = [‘buick skylark 320’, ‘plymouth satellite’, ‘amc rebel sst’, ‘ford torino’];


const cars = ['buick skylark 320','plymouth satellite','amc rebel sst','ford torino'];
const man = [];
const model = [];
for (let i in cars) {
    console.log(i, cars[i]);
    let cars1 = cars[i].split(' ');
    man.push(cars1[0]);
    model.push(cars[i].slice(cars1[0].length+1));
}
console.log(man, model);