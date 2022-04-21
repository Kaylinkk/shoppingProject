const {MarketItem} = require("./market-item");

class Crawler {

    constructor(browser, page) {
        this.browser = browser;
        this.page = page;
    }

    async process(searchKeyword) {
        let searchResult = MarketItem.ofEmpty();
        try {
            searchResult = await this.search(searchKeyword);
        } catch (exception) {
            console.error(exception);
        } finally {
            await this.destroy();
        }
        return searchResult;
    }

    async search(searchKeyword) {
        throw new Error('Not Implemented!');
    }

    async destroy() {
        if (!!this.browser) {
            await this.browser.close();
        }
    }

    async $innerText(selector) {
        return this.page.$eval(selector, element => element.textContent);
    }

}

module.exports = {
    Crawler,
}