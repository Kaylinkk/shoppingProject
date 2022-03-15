import React from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useState } from 'react';




function SSG(props) {
    const [Items, setItems] = useState([])

    let title = props.title

    const ssg = "https://emart.ssg.com/search.ssg?target=all&query=" + title


    const getHTML = async (keyword) => {
        try {
            return await axios.get(ssg)
        } catch (err) {
            console.log(err);
        }


    }


    const processData = async (keyword) => {
        let items = [];
        const html = await getHTML(keyword);
        // const $ = cheerio.load(data);
        // const $list = $('.b--near-white')

        // $list.each((index, node) => {
        //     items.push({
        //         Title: $(node).find('.w_O > span').text(),
        //         price: $(node).find('.lh-title > .lh-copy').text(),
        //         img: $(node).find('.relative > div >img').attr("src")
        //     })
        //     setItems(items)

        // });

        console.log(html)


    }

    processData("potato")

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

export default SSG