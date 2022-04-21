const {CrawlerFactory} = require("./crawler.factory");
const delay = require("delay");
const {CRAWLER_TYPE} = require("./crawler-type");


describe('Crawler', () => {

    beforeEach(async () => {
        await delay(1000);
    })

    it('크롤러가 정상적으로 시작된다.', async () => {
        const crawler = await CrawlerFactory.getCrawler(CRAWLER_TYPE.LOTTE);
        expect(crawler).toBeDefined();
    });

    describe('롯데', () => {
        it('검색 / 사과', async () => {
            const crawler = await CrawlerFactory.getCrawler(CRAWLER_TYPE.LOTTE);
            expect(crawler).toBeDefined();
            const cheapestItem = await crawler.search('사과');
            console.dir(cheapestItem);
        }, 60 * 1000);
    });

    describe('신세계', () => {
        it('검색 / 사과', async () => {
            const crawler = await CrawlerFactory.getCrawler(CRAWLER_TYPE.SSG);
            expect(crawler).toBeDefined();
            const cheapestItem = await crawler.search('사과');
            console.dir(cheapestItem);
        }, 60 * 1000);
    });

    describe('사이소', () => {
        it('검색 / 사과', async () => {
            const crawler = await CrawlerFactory.getCrawler(CRAWLER_TYPE.CYSO);
            expect(crawler).toBeDefined();
            const cheapestItem = await crawler.search('사과');
            console.dir(cheapestItem);
        }, 60 * 1000);
    });

    describe('농사랑', () => {
        it('검색 / 사과', async () => {
            const crawler = await CrawlerFactory.getCrawler(CRAWLER_TYPE.NONGSARANG);
            expect(crawler).toBeDefined();
            const cheapestItem = await crawler.search('사과');
            console.dir(cheapestItem);
        }, 60 * 1000);
    });

})