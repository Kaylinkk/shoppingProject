const puppeteer = require("puppeteer");
const environment = require("../config/key");
const {LotteCrawler} = require("./lotte.crawler");
const {SsgCrawler} = require("./ssg.crawler");
const {CRAWLER_TYPE} = require("./crawler-type");
const {CysoCrawler} = require("./cyso.crawler");
const {NongSaRangCrawler} = require("./nongsarang.crawler");

class CrawlerFactory {

    static async getCrawler(type) {
        let { browser, page } = await this.launchBrowser();
        if (type === CRAWLER_TYPE.LOTTE) {
            return new LotteCrawler(browser, page);
        } else if (type === CRAWLER_TYPE.NONGSARANG) {
            return new NongSaRangCrawler(browser, page);
        } else if (type === CRAWLER_TYPE.CYSO) {
            return new CysoCrawler(browser, page);
        } else if (type === CRAWLER_TYPE.SSG) {
            return new SsgCrawler(browser, page);
        }
    }

    static async launchBrowser() {
        const browser = await puppeteer.launch(environment.puppeteer.launchOptions);
        const page = await browser.newPage();
        return { browser, page };
    }

}

module.exports = {
    CrawlerFactory,
}