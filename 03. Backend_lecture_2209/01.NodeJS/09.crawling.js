const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.hanbit.co.kr/academy/books/new_book_list.html';
axios.get(url)
    .then(response => {
        //console.log(response.data);
        const $ = cheerio.load(response.data);

        $('.view_box').each((index, element) => {
            let title = $(element).find('.itemName').text().trim();
            let author = $(element).find('.author').text().trim();
            author = author.split(',').map(x => x.trim()).join(', ');
            let company = $(element).find('.company').text().trim();
            let price = $(element).find('.price').text().trim();
            console.log(index+1, '============================================');
            console.log(title);
            console.log(author, company, price);
        });
    })
    .catch(err => {
        console.log(err);
    });
