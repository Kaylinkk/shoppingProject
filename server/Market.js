module.exports = async function (title) {


    //lotte market

    let data = [];
    const puppeteer = require("puppeteer");

    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto("https://www.lotteon.com/search/search/search.ecn?render=search&platform=pc&q=" + title);

    await page.waitForSelector('li.srchProductItem');
    const total_items_List = await page.$$('li.srchProductItem')


    try {
        for (let total_items of total_items_List) {
            let name = await total_items.$eval('.srchProductUnitTitle', (ele) => {
                return ele.innerText
            })

            let price = await total_items.$eval('.s-product-price__final .s-product-price__number', (ele) => {
                return ele.innerText
            })


            let image = await total_items.$eval('.srchThumbImageWrap img', (ele) => {
                return ele.src
            })

            let href = await total_items.$eval('.srchProductUnitImageArea a', (ele) => {
                return ele.href
            })



            data.push({ title: name, price: parseInt(price.replace(/,/g, "")), image: image, href: href });


        }

        const cheapestProduct = data.reduce((prev, curr) => prev.price < curr.price ? prev : curr)
        browser.close();

        return cheapestProduct;

    } catch (error) {
        return false
    }



    // const costliestProduct = data.reduce((prev, curr) => prev.price > curr.price ? prev : curr)
    // console.log("this is the most expensive product!!!!!!!!!", costliestProduct);





};
