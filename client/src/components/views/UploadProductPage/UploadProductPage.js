import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import '../UploadProductPage/UploadProductPage.css'
const { TextArea } = Input;

const Grosery = [
    { key: 1, value: "vegetable" },
    { key: 2, value: "seafood" },
    { key: 3, value: "meat" },
    { key: 4, value: "rice" },
    { key: 5, value: "fruit" },
    { key: 6, value: "egg" },
    { key: 7, value: "grain" }
]


function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Groserykind, setGroserykind] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const groseryChangeHandler = (event) => {
        setGroserykind(event.currentTarget.value)

    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Groserykind || !Images.length === 0) {
            return alert(' please fill all the sections')
        }
        //서버에 채운 값들을 request로 보낸다.
        const body = {
            //로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            grosery: Groserykind


        }
        Axios.post("/api/product", body)
            .then(response => {
                if (response.data.success) {
                    alert("uploaded succesfully!")
                    props.history.push('/')
                } else {
                    alert("upload failed.. :(")
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 level={2}>Product Upload</h2>
                {/* level1이 제일 크다. */}
            </div>

            <Form >
                {/* drop zone */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>name</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>description</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>price(KRW)</label>
                <Input type="number" step="10" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={groseryChangeHandler} value={Groserykind}>
                    {Grosery.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}

                </select>
                <br />
                <br />
                <Button onClick={submitHandler}>
                    {/* antd의 버튼에서는 onSubmit은 동작안하고 onClick만 동작한다. */}
                    Save
                </Button>

            </Form>



        </div >
    )
}

export default UploadProductPage;