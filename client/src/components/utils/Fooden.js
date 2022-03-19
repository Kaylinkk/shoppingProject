import React from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useState } from 'react';




function Fooden(props) {
    const [Items, setItems] = useState([])

    let title = props.title

    const fooden = "https://www.fooden.com/online/?s="

    const getHTML = async (keyword) => {
        try {
            return await axios.get(fooden + encodeURI(keyword))
        } catch (err) {
            console.log(err);
        }


    }


    const processData = async (keyword) => {
        let items = [];
        const html = await getHTML(keyword);
        const $ = cheerio.load(html.data);
        const $list = $('.type-product ')

        $list.each((index, node) => {
            items.push({
                Title: $(node).find('.productInfoBox >h3').text(),
                price: $(node).find('.productInfoBox >.price > .amount').text(),
                img: $(node).find('productTopSection > a > img').attr("src")
            })
            setItems(items)

        });

        // console.log(Items);


    }

    processData(title)

    return (


        <table>
            <thead>
                <tr>
                    <th >Image </th>
                    <th >Title</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* <td >{Items.Title}</td>
                    <td >{Items.price}</td>
                    <td>{Items.img}</td> */}
                    <td >d</td>
                    <td >d</td>
                    <td>d</td>
                </tr>
            </tbody>
        </table>



    )
}

export default Fooden