import React from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useState } from 'react';



function Homeplus(props) {

    // const [Items, setItems] = useState([])
    let title = props.title
    const Homeplus = "https://search.shopping.naver.com/search/all?query="


    const extractContent = ($) =>
        $(".basicList_info_area__17Xyo")
            .map((_, product) => {
                const $product = $(product);
                return {
                    id: $product.find("a").attr("href"),
                    title: $product.find(".basicList_link__1MaTN").text(),
                    price: $product.find(".price_num__2WUXn").text(),
                };
            })
            .toArray();
    // ...

    // [{ id: '759', title: 'Bulbasaur', price: '£63.00' }, ...]
    axios
        .get("https://search.shopping.naver.com/search/all?query=" + title)
        .then(({ data }) => {
            const $ = cheerio.load(data); // Initialize cheerio

            const content = extractContent($);
            console.log(content);
            // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
        });
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

export default Homeplus