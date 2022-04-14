import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Link } from 'react-router-dom';
import '../DetailPage/Sections/ProductImage.css'



function DetailPage(props) {

    let productId = props.match.params.productId
    const [product, setProduct] = useState({});


    useEffect(() => {
        axios.get(`/api/product/productid?id=${productId}`)
            .then(response => {
                // console.log(response)
                setProduct(response.data.product[0])

            })
            .catch(err => alert(err))

    }, [])

    return (
        <>
            <div style={{ width: '100%', padding: '3rem 10rem' }}>
                <br />
                <Row gutter={[16, 16]} >

                    <Col lg={12} sm={24}>
                        <ProductImage detail={product} />

                    </Col>
                    <Col lg={12} sm={24} style={{ paddingLeft: '5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h1>{product.title}</h1>
                        </div>
                        <ProductInfo detail={product} />
                    </Col>
                </Row>


            </div>
            <br />
            <br />
            <div className='DetailPage_data' style={{ width: '100%', padding: '3rem 10rem' }}>
                <div className="wrap">


                    <Link to={`/compare/${product.title}`} state={{ product: product.title }}>
                        <button className="button_comparePage">Compare Price</button>
                    </Link>









                </div>


            </div>

        </>

    )
}


export default DetailPage