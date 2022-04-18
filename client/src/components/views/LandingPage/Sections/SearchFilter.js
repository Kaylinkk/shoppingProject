import React from 'react'
import { Input } from 'antd';
import { useState } from 'react';

import './CheckBox.css'

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
            className="search_input"
        /></div>
    )
}

export default SearchFilter