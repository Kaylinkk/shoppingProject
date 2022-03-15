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

    let walmart = `https://www.walmart.com/search?q=${props.detail.title}`
    let safeway = `https://anycart.com/@sales/find/${props.detail.title}`
    let amazonFresh = `https://www.amazon.com/s?k=${props.detail.title}`


    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">{props.detail.price} KRW</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
                <Descriptions.Item label="rate"><Rate disabled defaultValue={4} /></Descriptions.Item>
                <Descriptions.Item label="Website">where to get?</Descriptions.Item>
            </Descriptions>

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

                            <a href={walmart} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='https://cdn.corporate.walmart.com/dims4/WMT/cf80266/2147483647/strip/true/crop/855x305+0+0/resize/1960x700!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2F98%2F28%2F342ccbff478ab025592645fafcfc%2Fwalmart-logo.png' alt="walmart"></img></a>
                        </td>
                        <td className="tg-c3ow"></td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={safeway} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='https://logotyp.us/files/safeway.svg' alt="safeway"></img></a>
                        </td>
                        <td className="tg-c3ow"></td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={amazonFresh} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='https://brandlogovector.com/wp-content/uploads/2021/09/Amazon-Fresh-Logo.png' alt="walmart"></img></a>
                        </td>
                        <td className="tg-c3ow"> </td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={walmart} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='https://cdn.corporate.walmart.com/dims4/WMT/cf80266/2147483647/strip/true/crop/855x305+0+0/resize/1960x700!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2F98%2F28%2F342ccbff478ab025592645fafcfc%2Fwalmart-logo.png' alt="walmart"></img></a></td>
                        <td className="tg-c3ow"></td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow">
                            <a href={walmart} target="_blank" rel="noopener noreferrer">
                                <img className='img_logo' src='https://cdn.corporate.walmart.com/dims4/WMT/cf80266/2147483647/strip/true/crop/855x305+0+0/resize/1960x700!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2F98%2F28%2F342ccbff478ab025592645fafcfc%2Fwalmart-logo.png' alt="walmart"></img></a>
                        </td>
                        <td className="tg-c3ow"></td>
                    </tr>
                    <tr>
                        <td className="tg-c3ow"><a href={walmart}>
                            <img className='img_logo' src='https://cdn.corporate.walmart.com/dims4/WMT/cf80266/2147483647/strip/true/crop/855x305+0+0/resize/1960x700!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2F98%2F28%2F342ccbff478ab025592645fafcfc%2Fwalmart-logo.png' alt="walmart"></img></a></td>
                        <td className="tg-c3ow"></td>
                    </tr>
                </tbody>
            </table>


            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>


        </div >
    )
}

export default ProductInfo