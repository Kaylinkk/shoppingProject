const {Crawler} = require("./crawler");
const {MarketItem} = require("./market-item");
const delay = require("delay");

class LotteCrawler extends Crawler {

    constructor(browser, page) {
        super(browser, page);
    }

    /**
     * @param searchKeyword
     * @returns {Promise<MarketItem>}
     */
    async search(searchKeyword) {

        const searchURL = `https://www.lotteon.com/search/search/search.ecn?render=search&platform=pc&q=${searchKeyword}`;
        let marketItems = [];
        let searchResults = null;

        try {
            await this.page.goto(searchURL, { timeout: 1000 * 60, waitUntil: 'domcontentloaded' });
            await delay(2000);
            const emptyResult = await this.page.$('.srchResultNull.srchNullCharacter1');
            if (!!emptyResult) {
                console.log(`롯데 쇼핑몰 검색 결과 없음 [검색어 = ${searchKeyword}]`);
                return MarketItem.ofEmpty();
            }
            await this.page.waitForSelector('li.srchProductItem', { timeout: 1000 * 30 });
            searchResults = await this.page.$$('li.srchProductItem');
        } catch (exception) {
            console.error(`롯데 쇼핑몰 데이터 수집 실패 [검색어 = ${searchKeyword}]`, exception);
            return MarketItem.ofEmpty();
        }

        for (const item of searchResults) {

            const name = await this.$innerText('.srchProductUnitTitle');
            const price = await this.$innerText('.s-product-price__final .s-product-price__number');
            const image = await item.$eval('.srchThumbImageWrap img', ({ src }) => src);
            const href = await item.$eval('.srchProductUnitImageArea a', ({ href }) => href);

            marketItems.push(new MarketItem(name, price, image, href));
        }

        const cheapestProduct = marketItems.reduce((prev, curr) => prev.price < curr.price ? prev : curr)

        console.log(`롯데 쇼핑몰 최저가 상품 데이터 수집 완료 [검색어 = ${searchKeyword}, 상품명 = ${cheapestProduct.title}]`);

        return cheapestProduct;
    } // end of search

}

module.exports = {
    LotteCrawler,
}