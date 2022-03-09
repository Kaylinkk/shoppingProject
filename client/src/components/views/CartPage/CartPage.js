import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';


function CartPage(props) {

    const [Total, setTotal] = useState(0);


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
                    .then(response => { calTotal(response.payload.product) })

            }
        }
    }, [props.user.userData]);


    let calTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseFloat(item.price) * item.quantity
        })
        setTotal(total)
    }

    let removeProduct = (productId) => {
        dispatch(removeCartItem(productId))
            .then(response => {
                console.log(response)
            })


    }


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>🧺 {props.user.userData && props.user.userData.name}'s Cart🛒</h1>

            <div>
                <UserCardBlock products={props.user.cartDetail && props.user.cartDetail.product}
                    removeItem={removeProduct} />
            </div>

            <div>

                <div style={{ marginTop: '3rem' }}>
                    <h2>Estimated total: ${Total}</h2>
                </div>
            </div>



        </div>
    )
}

export default CartPage