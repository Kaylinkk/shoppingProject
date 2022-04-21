const {Crawler} = require("./crawler");
const {MarketItem} = require("./market-item");
const delay = require("delay");

class NongSaRangCrawler extends Crawler {

    constructor(browser, page) {
        super(browser, page);
    }

    /**
     * @param searchKeyword
     * @returns {Promise<MarketItem>}
     */
    async search(searchKeyword) {

        const searchURL = `https://www.nongsarang.co.kr/shop/shopbrand.html?search=${searchKeyword}`;
        let marketItems = [];
        let searchResults = null;

        try {
            await this.page.goto(searchURL, { timeout: 1000 * 60, waitUntil: 'domcontentloaded' });
            await delay(2000);
            const pageBodyText = await this.page.$eval('.page-body', element => element.textContent);
            if (pageBodyText.includes('검색된 상품이 없습니다.')) {
                console.log(`농사랑 쇼핑몰 검색 결과 없음 [검색어 = ${searchKeyword}]`);
                return MarketItem.ofEmpty();
            }
            await this.page.waitForSelector('.item-list', { timeout: 1000 * 30 });
            searchResults = await this.page.$$('.item-list');
        } catch (exception) {
            console.error(`농사랑 쇼핑몰 데이터 수집 실패`, exception);
            return MarketItem.ofEmpty();
        }

        for (const item of searchResults) {

            const name = await this.$innerText('li.prd-brand a');
            const price = (await this.$innerText('.prd-price b')).substring(0, 6);
            const image = await item.$eval('.thumb a img', ({ src }) => src);
            const href = await item.$eval('.thumb a', ({ href }) => href);

            marketItems.push(new MarketItem(name, price, image, href));
        }

        const cheapestProduct = marketItems.reduce((prev, curr) => prev.price < curr.price ? prev : curr)

        console.log(`농사랑 쇼핑몰 최저가 상품 데이터 수집 완료 [검색어 = ${searchKeyword}, 상품명 = ${cheapestProduct.title}]`);
        return cheapestProduct;
    } // end of search

}

module.exports = {
    NongSaRangCrawler,
}