module.exports = async function (title) {
    //saiso
    let data = [];
    const puppeteer = require("puppeteer");

    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto("https://www.cyso.co.kr/shop/search.php?ws_no=0&ws_url=https%3A%2F%2Fwww.cyso.co.kr%2Fshop%2Fmonevent.php&qname=1&qmkname=1&qsearch=1&q=" + title);

    try {
        await page.waitForSelector('li.sct_li', { timeout: 3000 });
        const total_items_List = await page.$$("li.sct_li")


        for (let total_items of total_items_List) {
            let name = await total_items.$eval('.sct_txt', (ele) => {
                return ele.innerText
            })

            let price = await total_items.$eval('.sct_cost', (ele) => {
                return ele.innerText.substring(0, 6)
            })

            let image = await total_items.$eval('li.sct_li img', (ele) => {
                return ele.src
            })


            let href = await total_items.$eval('.sct_img a', (ele) => {
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


};

