import React, { useState } from 'react'
import { Collapse } from 'antd';
import '../Sections/CheckBox.css'

const { Panel } = Collapse;




function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (data) => {
        //누른 것의 index를 구하고
        const currentIndex = Checked.indexOf(data)

        //전체 Checked된 state에서 현재누른 checked박스가 이미 있다면



        const newChecked = [...Checked]
        //state넣어준다. 
        if (currentIndex === -1) {
            newChecked.push(data)
            //빼주고

        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilter(newChecked);

    }

    const renderCheckboxLists = () => props.list && props.list.map((data, index) => (
        <React.Fragment key={index} >

            <label>
                <input type="checkbox" style={{ paddingRight: "4px" }}
                    onChange={() => handleToggle(data._id)} checked={Checked.indexOf(data._id) === -1 ? false : true} />
                <div className='checkBox_list_name'>{data.name}</div>
            </label>

        </React.Fragment>
    ))
    return (



        <div className="checkBox_list">
            <h2>Do you want to see the same kind?</h2>
            {renderCheckboxLists()}</div>




    )
}

export default CheckBox