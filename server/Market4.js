
module.exports = async function (title) {

    //nongsarang market
    let data = [];
    const puppeteer = require("puppeteer");

    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();


    await page.goto("https://www.nongsarang.co.kr/shop/shopbrand.html?search=" + title);
    // //find the number of total children rendered


    try {
        await page.waitForSelector('.item-list', { timeout: 3000 });
        const total_items_List = await page.$$(".item-list")
        for (let total_items of total_items_List) {
            let itemName = await total_items.$eval('li.prd-brand a', (ele) => {
                return ele.innerText
            })

            let price = await total_items.$eval('.prd-price b', (ele) => {
                return ele.innerText.substring(0, 6)
            })

            let image = await total_items.$eval('.thumb a img', (ele) => {
                return ele.src
            })


            let href = await total_items.$eval('.thumb a', (ele) => {
                return ele.href
            })

            data.push({ title: itemName, price: parseInt(price.replace(/,/g, "")), image: image, href: href });
            // console.log(data)

        }

        const cheapestProduct = data.reduce((prev, curr) => prev.price < curr.price ? prev : curr)

        browser.close();

        return cheapestProduct;

    } catch (error) {
        return false
    }


    // console.log("THIS IS THE DATA", data)
    // const cheapestProduct = data.reduce((prev, curr) => prev.price < curr.price ? prev : curr)
    // console.log("this is the cheapest product!!!!!!!!!", cheapestProduct);


    // const costliestProduct = data.reduce((prev, curr) => prev.price > curr.price ? prev : curr)
    // console.log("this is the most expensive product!!!!!!!!!", costliestProduct);

};
