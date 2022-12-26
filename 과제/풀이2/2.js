// 문자열에서 'the'의 개수를 출력하는 프로그램 (모두 소문자이며, them, there, their 등은 포함 x)

const text = `
the grown-ups' response, this time, was to advise me to lay aside my drawings of boa constrictors, 
whether from the inside or the outside, and devote myself instead to geography, history, arithmetic, 
and grammar. That is why, at the, age of six, I gave up what might have been a magnificent career 
as a painter. I had been disheartened by the failure of my Drawing Number One and my Drawing Number Two. 
Grown-ups never understand anything by themselves, and it is tiresome for children to be always and 
forever explaining things to the.`;

let splittedText = text.split(' ') // 띄어쓰기로 split

let onlyAlphabetText = splittedText.map((item)=> {
    return item.replace('\n', '').replace(/[^a-zA-Z]/, '') // \n과 특수문자 제거
})

console.log(onlyAlphabetText)

console.log('the 개수:', onlyAlphabetText.filter(element => 'the'===element).length)