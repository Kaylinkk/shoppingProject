import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';



function DetailPage(props) {

    let productId = props.match.params.productId
    const [Product, setProduct] = useState({});
    useEffect(() => {
        axios.get(`/api/product/productid?id=${productId}&type=single`)
            .then(response => {
                // setProduct(response.data[0])???
                setProduct(response.data.product[0])

            })
            .catch(err => alert(err))
    }, [])

    return (
        <div style={{ width: '85%', padding: '3rem 4rem' }}>
            <br />
            <Row gutter={[16, 16]} >

                <Col lg={12} sm={24}>
                    <ProductImage detail={Product} />

                </Col>
                <Col lg={12} sm={24}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h1>{Product.title}</h1>
                    </div>
                    <ProductInfo detail={Product} />
                </Col>
            </Row>


        </div>
    )
}


export default DetailPage