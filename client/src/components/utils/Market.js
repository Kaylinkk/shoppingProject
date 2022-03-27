import React from 'react';
import { useState } from 'react';
import { Result } from 'antd';



function Market(props) {
    // const axios = require("axios");
    // const cheerio = require("cheerio");
    // const [Items, setItems] = useState([])
    let title = props.title
    // const Homeplus = "https://search.shopping.naver.com/search/all?query="

    const { spawn } = require('child_process');



    const result = spawn('python', ['market.py', { title }]);


    result.stdout.on('result', function (result) {
        console.log(result.toString());
    });

    result.stderr.on('result', function (result) {
        console.log(result.toString());
    });




    // const extractContent = ($) =>
    //     $(".basicList_info_area__17Xyo")
    //         .map((_, product) => {
    //             const $product = $(product);
    //             return {
    //                 id: $product.find("a").attr("href"),
    //                 title: $product.find(".basicList_link__1MaTN").text(),
    //                 price: $product.find(".price_num__2WUXn").text(),
    //             };
    //         })
    //         .toArray();
    // // ...

    // // [{ id: '759', title: 'Bulbasaur', price: '£63.00' }, ...]
    // const testURL = 'https://search.shopping.naver.com/search/all?query=';
    // const myInit = {
    //     method: 'HEAD',
    //     mode: 'no-cors',
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // };

    // const myRequest = new Request(testURL, myInit);

    // fetch(myRequest).then(function (response) {
    //     console.log("new thing", response);
    //     return response.json();
    // }).then(function (response) {
    //     console.log("works", response);
    // }).catch(function (e) {
    //     console.log(e);
    // });

    // axios
    //     .get("https://search.shopping.naver.com/search/all?query=potato")
    //     .then(({ data }) => {
    //         const $ = cheerio.load(data); // Initialize cheerio

    //         const content = extractContent($);
    //         console.log("SHOW ME THE CONTENT", content);
    //         // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
    //     });
    //#__next > div > div.style_container__1YjHN > div > div.style_content_wrap__1PzEo > div.style_content__2T20F > ul > div > div:nth-child(1) > li > div > div.basicList_info_area__17Xyo


    // const scrapeStaticWebpage = async () => {
    //     try {
    //         const { data } = await axios.get(Homeplus + encodeURI(title));


    //         processData(data);
    //     } catch (err) {
    //         console.log("error", err);
    //     }
    // };

    // const processData = async (data) => {

    //     const $ = cheerio.load(data);
    //     const $list = $('.basicList_item__2XT81')

    //     let items = [];
    //     $list.each((index, element) => {

    //         const target = $(element)
    //         const productTitle = target.find('.basicList_title__3P9Q7 > a').text()
    //         const price = target.find('.price_num__2WUXn').text()
    //         // const img = target.find('.thumbWrap >span > img').attr("src")
    //         // const link = target.find('.thmb > a').attr('href')
    //         // const item = {
    //         //     img: img,
    //         //     name: productTitle,
    //         //     price: price,
    //         //     link: link,
    //         // }
    //         // items.push(item);
    //         // setItems(items)
    //         console.log(productTitle, price)

    //     });

    // }

    // { scrapeStaticWebpage() }

    return (


        <table >
            <thead>
                <tr>
                    <th >Image </th>
                    <th >Title</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>

                    <td ></td>
                    <td></td>

                </tr>
            </tbody>
        </table>



    )
}

export default Market