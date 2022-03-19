const axios = require("axios");
const cheerio = require("cheerio");

const extractContent = ($) =>
  $(".basicList_info_area__17Xyo")
    .map((_, product) => {
      const $product = $(product);
      return {
        id: $product.find("a").attr("href"),
        title: $product.find(".basicList_link__1MaTN").text(),
        price: $product.find(".price_num__2WUXn").text(),
      };
    })
    .toArray();
// ...

// [{ id: '759', title: 'Bulbasaur', price: '£63.00' }, ...]
axios
  .get("https://search.shopping.naver.com/search/all?query=potato")
  .then(({ data }) => {
    const $ = cheerio.load(data); // Initialize cheerio

    const content = extractContent($);
    console.log(content);
    // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
  });
//#__next > div > div.style_container__1YjHN > div > div.style_content_wrap__1PzEo > div.style_content__2T20F > ul > div > div:nth-child(1) > li > div > div.basicList_info_area__17Xyo
