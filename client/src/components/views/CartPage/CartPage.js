import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';
import { Empty } from 'antd';
import './Sections/UserCardBlock.css'
import Paypal from '../../utils/Paypal';

function CartPage(props) {

    const [Total, setTotal] = useState(0);
    const [ShowAmount, setShowAmount] = useState(false)


    const dispatch = useDispatch();
    useEffect(() => {


        let cartItems = []
        //리덕스 User state의 카트 안에 상품이 들어있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)

                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => { calTotal(response.payload) })

            }
        }
    }, [props.user.userData]);


    let calTotal = (cartDetail) => {
        let total = 0;
        cartDetail.product.map(item => {
            total += parseFloat(item.price) * item.quantity
        })
        setTotal(total)
        setShowAmount(true)
    }

    let removeProduct = (productId) => {
        dispatch(removeCartItem(productId))
            .then(response => {
                if (response.payload.productInfo.length <= 0) {
                    setShowAmount(false)
                }
            })


    }


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>🧺 {props.user.userData && props.user.userData.name}'s Cart🛒</h1>

            <div>
                <UserCardBlock products={props.user.cartDetail && props.user.cartDetail.product}
                    removeItem={removeProduct} />
            </div>


            {ShowAmount ?
                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{ marginBottom: '3rem' }}>Estimated total: ${Total}</h2>
                    <Paypal

                        total={Total}
                    />

                </div>

                :

                <Empty
                    image="https://cdn.dribbble.com/users/44167/screenshots/4199208/media/6b915e31225bcd92bee249dc7a977dda.png"
                    description={false}
                >

                </Empty>
            }







        </div>
    )
}

export default CartPage