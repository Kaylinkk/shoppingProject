import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';
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
            <Checkbox style={{ paddingRight: "4px" }}
                onChange={() => handleToggle(data._id)} checked={Checked.indexOf(data._id) === -1 ? false : true} />
            <span style={{ paddingRight: "1rem", fontSize: "20px" }}>{data.name}</span>
        </React.Fragment>
    ))
    return (

        <Collapse defaultActiveKey={['0']} bordered={false} >

            <Panel header="❤🧡💛💚💙💜Category❤🧡💛💚💙💜" key="1">

                {renderCheckboxLists()}
            </Panel>

        </Collapse>

    )
}

export default CheckBox