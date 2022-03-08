import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';



function DetailPage(props) {
    const productId = props.match.params.productId
    const [Product, setProduct] = useState({});
    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data)
                    setProduct(response.data.product[0])
                } else {
                    alert('failed to get detail page of product')
                }
            })
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