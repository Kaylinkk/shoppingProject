import React from 'react'
import { Button, Descriptions, Rate, message } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
import '../Sections/ProductImage.css'

function ProductInfo(props) {
    const dispatch = useDispatch();


    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.

        dispatch(addToCart(props.detail._id))
            .then(() => message.success('added to your cart!', 2))

    }

    let ssg = `https://www.ssg.com/search.ssg?target=all&query=${props.detail.title}`
    let lotte = `https://www.lotteon.com/search/search/search.ecn?render=search&platform=pc&q=${props.detail.title}`
    let nongsarang = `https://www.nongsarang.co.kr/shop/shopbrand.html?search=${props.detail.title}`
    let saiso = `https://www.cyso.co.kr/shop/search.php?qsort=&qorder=&qcaid=&qname=1&qmkname=1&qsearch=1&qfrom=&qto=&q=${props.detail.title}`

    return (
        <div>
            <div className='info_wrap'>

                <div className='rate_wrap'>
                    <div className='rate'>
                        <Rate disabled defaultValue={4} />
                    </div>
                </div>
                <div className='price_wrap'>
                    <p>{props.detail.price}</p>
                    <p> KRW</p>
                </div>

                <div className='description_wrap'>
                    <p>{props.detail.description}</p>
                </div>



                <br />
                <br />


            </div>

            <table className='tg'>
                <thead>
                    <tr>
                        <th className="tg-7btt">Company </th>
                        <th className="tg-7btt">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="tg-c3ow">

                            <a href={ssg} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='https://cdn.digitaltoday.co.kr/news/photo/202010/249780_215115_201.jpg' alt="ssg"></img></a>
                        </td>
                        <td className="tg-c3ow"></td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={lotte} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='https://cdn.speconomy.com/news/photo/202112/310636_310312_3850.png' alt="lotte"></img></a>
                        </td>
                        <td className="tg-c3ow"></td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={nongsarang} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='http://www.todaychungnam.net/news/photo/202108/189868_191489_528.jpg' alt="nongsarang"></img></a>
                        </td>
                        <td className="tg-c3ow"> </td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={saiso} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='http://www.dkitnews.com/imgdata/tk_sagunin_com/201604/2016042653387960.jpg' alt="saiso"></img></a></td>
                        <td className="tg-c3ow"></td>
                    </tr>
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>

        </div >
    )
}

export default ProductInfo