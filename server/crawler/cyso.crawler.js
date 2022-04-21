const {Crawler} = require("./crawler");
const {MarketItem} = require("./market-item");
const delay = require("delay");

class CysoCrawler extends Crawler {

    constructor(browser, page) {
        super(browser, page);
    }

    /**
     * @param searchKeyword
     * @returns {Promise<MarketItem>}
     */
    async search(searchKeyword) {

        const searchURL = `https://www.cyso.co.kr/shop/search.php?ws_no=0&ws_url=https%3A%2F%2Fwww.cyso.co.kr%2Fshop%2Fmonevent.php&qname=1&qmkname=1&qsearch=1&q=${searchKeyword}`;
        let marketItems = [];
        let searchResults = null;

        try {
            await this.page.goto(searchURL, { timeout: 1000 * 60, waitUntil: 'domcontentloaded' });
            await delay(2000);
            const emptyResult = await this.page.$('.sct_noitem');
            if (!!emptyResult) {
                console.log(`사이소 쇼핑몰 검색 결과 없음 [검색어 = ${searchKeyword}]`);
                return MarketItem.ofEmpty();
            }
            await this.page.waitForSelector('li.sct_li', { timeout: 1000 * 30 });
            searchResults = await this.page.$$('li.sct_li');
        } catch (exception) {
            console.error(`사이소 쇼핑몰 데이터 수집 실패 [검색어 = ${searchKeyword}]`, exception);
            return MarketItem.ofEmpty();
        }

        for (const item of searchResults) {

            const name = await this.$innerText('.sct_txt');
            const price = (await this.$innerText('.sct_cost')).substring(0, 6);
            const image = await item.$eval('li.sct_li img', ({ src }) => src);
            const href = await item.$eval('.sct_img a', ({ href }) => href);

            marketItems.push(new MarketItem(name, price, image, href));
        }

        const cheapestProduct = marketItems.reduce((prev, curr) => prev.price < curr.price ? prev : curr)

        console.log(`사이소 쇼핑몰 최저가 상품 데이터 수집 완료 [검색어 = ${searchKeyword}, 상품명 = ${cheapestProduct.title}]`);

        return cheapestProduct;
    } // end of search

}

module.exports = {
    CysoCrawler,
}