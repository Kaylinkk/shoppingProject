import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios';
import '../utils/FileUpload.css'
import { Button } from 'antd';




function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/fomr-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])
                } else {
                    alert('failed to save file')
                }
            })
    }


    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div className='dropzone' >
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div className='dropzone_imageSection'
                        {...getRootProps()}>
                        <input {...getInputProps()} />

                        <Button className='upload_btn'>Click to Upload</Button>


                    </div>


                )}
            </Dropzone>

            <div className='image'>

                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '200px', width: '200px', height: '140px', overflowX: 'scroll' }}
                            src={`http://localhost:5000/${image}`}
                            // src={`/${image}`}
                            alt="uploadfile" /></div>
                ))}
            </div>





        </div>

    )
}

export default FileUpload