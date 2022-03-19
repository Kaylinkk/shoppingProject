import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import '../DetailPage/Sections/ProductImage.css'

import GSshop from './../../utils/GSshop';
import Fooden from './../../utils/Fooden';
import Homeplus from '../../utils/Homeplus';
import SSG from '../../utils/SSG';


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
    }, [productId])

    return (
        <>
            <div style={{ width: '100%', padding: '3rem 10rem' }}>
                <br />
                <Row gutter={[16, 16]} >

                    <Col lg={12} sm={24}>
                        <ProductImage detail={Product} />

                    </Col>
                    <Col lg={12} sm={24} style={{ paddingLeft: '5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h1>{Product.title}</h1>
                        </div>
                        <ProductInfo detail={Product} />
                    </Col>
                </Row>


            </div>
            <br />
            <br />
            <div className='DetailPage_data' style={{ width: '100%', padding: '3rem 10rem' }}>
                <h2>website</h2>
                {/* <GSshop title={Product.title} /> */}
                {/* <Fooden title={Product.title} /> */}
                <Homeplus title={Product.title} />
                {/* <SSG title={Product.title} /> */}


            </div>

        </>

    )
}


export default DetailPage