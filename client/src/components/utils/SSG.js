import React from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useState } from 'react';

function SSG(props) {

    const [Items, setItems] = useState([])
    let title = props.title
    const ssg = "https://www.ssg.com/search.ssg?target=all&query="

    const scrapeStaticWebpage = async () => {
        try {
            const { data } = await axios.get(ssg + encodeURI(title));

            processData(data);
        } catch (err) {
            console.log("error", err);
        }
    };

    const processData = async (data) => {

        const $ = cheerio.load(data);
        const $list = $('.cunit_t232')

        let items = [];
        $list.each((index, element) => {

            const target = $(element)
            const productTitle = target.find('.cunit_md >.title > a >.tx_ko').text().slice(0, 10)
            const price = target.find('.cunit_price > .opt_price> .ssg_price').text().slice(0, 10)
            const img = "https:" + target.find('.cunit_prod >.thmb > a > img').attr("src").slice(0, 10)
            const link = "https://www.ssg.com/" + target.find('.thmb > a').attr('href').slice(0, 10)
            const item = {
                img: img,
                name: productTitle,
                price: price,
                link: link,
            }
            items.push(item);
            setItems(items)
        });
        console.log(items)
    }

    { scrapeStaticWebpage() }

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
                    {/* <td >{Items.name}</td> */}
                    <td ></td>
                    <td></td>

                </tr>
            </tbody>
        </table>



    )
}

export default SSG