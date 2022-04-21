const {Crawler} = require("./crawler");
const {MarketItem} = require("./market-item");
const delay = require("delay");

class SsgCrawler extends Crawler {

    constructor(browser, page) {
        super(browser, page);
    }

    /**
     * @param searchKeyword
     * @returns {Promise<MarketItem>}
     */
    async search(searchKeyword) {

        const searchURL = `https://www.ssg.com/search.ssg?target=all&query=${searchKeyword}`;
        let marketItems = [];
        let searchResults = null;

        try {
            await this.page.goto(searchURL, { timeout: 1000 * 60, waitUntil: 'domcontentloaded' });
            await delay(2000);
            const pageBodyText = await this.page.$eval('.csrch_top.v2', element => element.textContent);
            if (pageBodyText.includes('검색된 상품이 없습니다.')) {
                console.log(`신세계 쇼핑몰 검색 결과 없음 [검색어 = ${searchKeyword}]`);
                return MarketItem.ofEmpty();
            }
            await this.page.waitForSelector('li.cunit_t232', { timeout: 1000 * 30 });
            searchResults = await this.page.$$('li.cunit_t232');
        } catch (exception) {
            console.error(`신세계 쇼핑몰 데이터 수집 실패 [검색어 = ${searchKeyword}]`, exception);
            return MarketItem.ofEmpty();
        }

        for (const item of searchResults) {

            const name = await this.$innerText('em.tx_ko');
            const price = await this.$innerText('em.ssg_price');
            const image = await item.$eval('li.cunit_t232 .cunit_prod div.thmb img', ({ src }) => src);
            const href = await item.$eval('.thmb a', ({ href }) => href);

            marketItems.push(new MarketItem(name, price, image, href));
        }

        const cheapestProduct = marketItems.reduce((prev, curr) => prev.price < curr.price ? prev : curr)

        console.log(`신세계 쇼핑몰 최저가 상품 데이터 수집 완료 [검색어 = ${searchKeyword}, 상품명 = ${cheapestProduct.title}]`);

        return cheapestProduct;
    } // end of search

}

module.exports = {
    SsgCrawler,
}