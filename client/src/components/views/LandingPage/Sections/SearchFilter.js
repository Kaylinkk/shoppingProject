import React from 'react'
import { Input } from 'antd';
import { useState } from 'react';
const { Search } = Input;

function SearchFilter(props) {

    const [SearchTerms, setSearchTerms] = useState("")
    const searchHandler = (event) => {
        setSearchTerms(event.currentTarget.value);
        props.refreshFunction(event.currentTarget.value)

    }


    return (
        <div> <Search placeholder="Search everything at our Store"
            onChange={searchHandler}
            value={SearchTerms}
            style={{ width: "40rem", height: "50px" }} /></div>
    )
}

export default SearchFilter