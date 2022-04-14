
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Sections/MarketProduct.css'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";



function MarketProduct(props) {
    const [dataCompare, setdataCompare] = useState();
    const [loading, setLoading] = useState(false)
    const title = props.match.params.title

    useEffect(() => {
        setLoading(true)

        axios.get(`/api/compare?title=${title}`)
            .then(response => {
                setLoading(false)
                setdataCompare(response.data.response);
                console.log("THIS IS THE DATA BRO!", response.data.response, "Data", dataCompare);

            })
            .catch(err => alert(err))

    }, [])







    return (
        <div className='container'>
            {
                loading ?



                    <ClimbingBoxLoader color={"#e68297"} loading={loading} size={30} />

                    :



                    <div className="wrapper">

                        {/* market1 lotte */}

                        <div className='table_top'>LOTTE</div>
                        <div className="table">

                            <div className="row header">

                                <div className="cell">
                                    Image
                                </div>
                                <div className="cell">
                                    Name
                                </div>
                                <div className="cell">
                                    Price
                                </div>

                            </div>

                            <div className="row">
                                <div className="cell" data-title="Image">
                                    <a href={dataCompare && dataCompare.market1.href} target='_blank' >
                                        <img className='item_image' src={dataCompare && dataCompare.market1.image} alt="" />
                                    </a>

                                </div>

                                <div className="cell cell_name" data-title="Name">
                                    {dataCompare && dataCompare.market2 === false && "Item not found 💔"}
                                    {dataCompare && dataCompare.market1.title}
                                </div>
                                <div className="cell cell_price" data-title="Price">
                                    {dataCompare && dataCompare.market1.price}
                                </div>

                            </div>

                        </div>





                        {/* Market2 SSG */}

                        <div className='table_top'>SSG</div>
                        <div className="table">

                            <div className="row header">

                                <div className="cell">
                                    Image
                                </div>
                                <div className="cell">
                                    Name
                                </div>
                                <div className="cell">
                                    Price
                                </div>

                            </div>

                            <div className="row">
                                <div className="cell" data-title="Image">
                                    <a href={dataCompare && dataCompare.market2.href} target="_blank" >
                                        <img className='item_image' src={dataCompare && dataCompare.market2.image} alt="" />
                                    </a>


                                </div>

                                <div className="cell cell_name" data-title="Name">
                                    {dataCompare && dataCompare.market2 === false && "Item not found 💔"}
                                    {dataCompare && dataCompare.market2.title}
                                </div>
                                <div className="cell cell_price" data-title="Price">
                                    {dataCompare && dataCompare.market2.price}
                                </div>

                            </div>

                        </div>



                        {/* market3 Saiso */}
                        <div className='table_top'>Saiso</div>
                        <div className="table">

                            <div className="row header">

                                <div className="cell">
                                    Image
                                </div>
                                <div className="cell">
                                    Name
                                </div>
                                <div className="cell">
                                    Price
                                </div>

                            </div>

                            <div className="row">
                                <div className="cell" data-title="Image">
                                    <a href={dataCompare && dataCompare.market3.href} target="_blank">
                                        <img className='item_image' src={dataCompare && dataCompare.market3.image} alt="" />
                                    </a>
                                </div>

                                <div className="cell cell_name" data-title="Name">
                                    {dataCompare && dataCompare.market3 === false && "Item not found 💔"}
                                    {dataCompare && dataCompare.market3.title}

                                </div>
                                <div className="cell cell_price" data-title="Price">
                                    {dataCompare && dataCompare.market3.price}
                                </div>

                            </div>

                        </div>


                        {/* market4 nongsarang */}


                        <div className='table_top'>nongsarang</div>
                        <div className="table">

                            <div className="row header">

                                <div className="cell">
                                    Image
                                </div>
                                <div className="cell">
                                    Name
                                </div>
                                <div className="cell">
                                    Price
                                </div>

                            </div>

                            <div className="row">
                                <div className="cell" data-title="Image">
                                    <a href={dataCompare && dataCompare.market4.href} target="_blank">
                                        <img className='item_image' src={dataCompare && dataCompare.market4.image} alt="" />
                                    </a>
                                </div>

                                <div className="cell cell_name" data-title="Name">
                                    {dataCompare && dataCompare.market4 === false && "Item not found 💔"}
                                    {dataCompare && dataCompare.market4.title}

                                </div>
                                <div className="cell cell_price" data-title="Price">
                                    {dataCompare && dataCompare.market4.price}
                                </div>

                            </div>

                        </div>



                    </div>



            }





        </div>

    )

}
export default MarketProduct