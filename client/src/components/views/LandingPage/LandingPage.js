import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import '../LandingPage/LandingPage.css';
import CheckBox from './Sections/CheckBox'
import { grosery } from '../LandingPage/Sections/Datas'
import SearchFilter from './Sections/SearchFilter'



function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(20)
    const [Postlength, setPostlength] = useState()
    const [Filters, setFilters] = useState([])
    const [SearchTerms, setSearchTemrs] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)

    }, [])


    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostlength(response.data.postLength)
                } else {
                    alert("failed to get product :(")
                }
            })
    }

    const loadmoreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body)
        setSkip(skip);
    }



    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={6} xs={24} key={index}>
            {/* large, medium, x-small */}
            <Card hoverable
                cover={<a href={`/product/${product._id}`} >
                    <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`${product.price} KRW`}
                />
            </Card>
        </Col >
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)


    }

    const handleFilter = (filters, grosery) => {
        const newFilters = { ...Filters }
        newFilters[grosery] = filters

        showFilteredResults(newFilters)

    }

    const updateSearchTerm = (newSearchTerms) => {


        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerms: newSearchTerms
        }
        setSkip(0)
        setSearchTemrs(newSearchTerms)
        getProducts(body)
    }




    return (
        <>
            <div className='introduce' >
                <h2> WE WILL MAKE YOUR LIFE EASIER <Icon type="smile" /> </h2>
            </div>

            <div>
                <Carousel autoplay >
                    <div>
                        <img src="img/ImageSlider1.jpg" alt="slider1"></img>
                    </div>
                    <div>
                        <img src="img/ImageSlider2.jpg" alt="slider2"></img>
                    </div>
                    <div>
                        <img src="img/ImageSlider3.jpg" alt="slider3"></img>
                    </div>
                    <div>
                        <img src="img/ImageSlider4.jpg" alt="slider4"></img>
                    </div>
                </Carousel>


            </div>
            <div style={{ width: '75%', margin: '3rem auto' }}>





                {/* Search */}
                <div className='searchfilter'>
                    <SearchFilter refreshFunction={updateSearchTerm} />
                </div>

                {/* Filter */}

                {/* Checkbox */}
                <CheckBox list={grosery} handleFilter={filters => handleFilter(filters, "grosery")} />

                {/* Cards */}


                <Row gutter={[24, 24]} >
                    {renderCards}
                </Row>

                <br />

                {Postlength >= Limit &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='btn' onClick={loadmoreHandler}>more</button>
                    </div>
                }




            </div>

        </>
    )
}

export default LandingPage