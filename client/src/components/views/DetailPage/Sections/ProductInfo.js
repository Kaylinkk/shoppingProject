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
    let elevenSreet = `https://search.11st.co.kr/Search.tmall?kwd=${props.detail.title}`
    let naverShopping = `https://search.shopping.naver.com/search/all?query=${props.detail.title}`
    let nonghyupmall = `https://www.nonghyupmall.com/BC1F010M/srchTotalList.nh?searchTerm_main=${props.detail.title}`

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






            {/* <Descriptions title="Product Info">
                <Descriptions.Item label="Price">{props.detail.price} KRW</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
                <Descriptions.Item label="rate"><Rate disabled defaultValue={4} /></Descriptions.Item>
             
            </Descriptions> */}

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
                                <img className='img_logo' src='https://play-lh.googleusercontent.com/U4fk5FzvwR4bPYWeTPmYX_Lpm3ANMHTcMEQ9qbrWO-qucIPPA9olM1bIiAmdZLpEIPMg=s360-rw' alt="ssg"></img></a>
                        </td>
                        <td className="tg-c3ow"></td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={elevenSreet} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='https://image.newdaily.co.kr/site/data/img/2019/06/23/2019062300004_0.jpg' alt="11street"></img></a>
                        </td>
                        <td className="tg-c3ow"></td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={naverShopping} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='http://wiki.hash.kr/images/thumb/d/d4/%EB%84%A4%EC%9D%B4%EB%B2%84_%EC%87%BC%ED%95%91_%EB%A1%9C%EA%B3%A0.png/300px-%EB%84%A4%EC%9D%B4%EB%B2%84_%EC%87%BC%ED%95%91_%EB%A1%9C%EA%B3%A0.png' alt="naver"></img></a>
                        </td>
                        <td className="tg-c3ow"> </td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={nonghyupmall} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='https://www.cheumsketch.co.kr/img/mobile/common/partner_logo_n5.jpg' alt="nonghyupmall"></img></a></td>
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