module.exports = async function (title) {

    //ssg market
    let data = [];
    const puppeteer = require("puppeteer");

    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto("https://www.ssg.com/search.ssg?target=all&query=" + title);
    // //find the number of total children rendered
    await page.waitForSelector('li.cunit_t232');
    const total_items_List = await page.$$("li.cunit_t232")

    try {

        for (let total_items of total_items_List) {
            let name = await total_items.$eval('em.tx_ko', (ele) => {
                return ele.innerText
            })

            let price = await total_items.$eval('em.ssg_price', (ele) => {
                return ele.innerText
            })

            let image = await total_items.$eval('li.cunit_t232 .cunit_prod div.thmb img', (ele) => {
                return ele.src
            })


            let href = await total_items.$eval('.thmb a', (ele) => {
                return ele.href
            })




            data.push({
                title: name, price: parseInt(price.replace(/,/g, "")), image: image, href: href
            });

        }
        const cheapestProduct = data.reduce((prev, curr) => prev.price < curr.price ? prev : curr)
        browser.close();
        return cheapestProduct;


    } catch (error) {
        return false
    }





};
