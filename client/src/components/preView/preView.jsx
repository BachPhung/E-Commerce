import React, { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../redux/firebase'
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { Avatar, Input, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import './preView.scss'
const PreView = () => {
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState()
    const [inputs, setInputs] = useState({})
    const [cat, setCat] = useState([])
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    })
    useEffect(() => {
        console.log(inputs)
    }, [inputs])
    const handleChange = (e) => {
        setInputs((preV) => {
            return { ...preV, [e.target.name]: e.target.value }
        })
    }
    const handlePreviewAvatar = (e) => {
        const fileTemps = e.target.files[0]
        console.log(fileTemps);
        fileTemps.preview = URL.createObjectURL(fileTemps)
        setAvatar(fileTemps)
    }
    const handleClick = (e) => {
        e.preventDefault()
        const storage = getStorage(app)
        const fileName = new Date().getTime() + avatar.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, avatar)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('file available at: ', downloadURL);
                    const product = { ...inputs, img: downloadURL, categories: cat };
                    addProduct(product, dispatch);
                });
            }
        );
    }
    return (
        <div>
            <h1>Add Product </h1>
            <div className='wrapper'>
                <form className='form' onSubmit={handleClick}>
                    <label htmlFor="contained-button-file">
                        <Input style={{ display: 'none' }} accept="image/*" id="contained-button-file" type="file" onChange={handlePreviewAvatar} required />
                        <Button variant="outlined" component="span">
                            Product Image
                        </Button>
                    </label>

                    <TextField
                        className='input-element'
                        label="Size"
                        id="filled-size-small"
                        placeholder="XS, S, ..."
                        variant="filled"
                        size="small"
                        name='title'
                        onChange={handleChange}
                        type='text'
                        variant="standard"
                        required
                    />
                    <TextField
                        className='input-element'
                        label="Desc"
                        id="filled-size-small"
                        placeholder="Description"
                        variant="filled"
                        size="small"
                        name='title'
                        onChange={handleChange}
                        type='text'
                        variant="standard"
                        required
                    />
                    <TextField
                        className='input-element'
                        label="Category"
                        id="filled-size-small"
                        placeholder="T-shirt, Women, ..."
                        variant="filled"
                        size="small"
                        name='title'
                        onChange={handleChange}
                        type='text'
                        variant="standard"
                        required
                    />
                    <TextField
                        className='input-element'
                        label="Color"
                        id="filled-size-small"
                        placeholder="Yellow, Red, ..."
                        variant="filled"
                        size="small"
                        name='title'
                        onChange={handleChange}
                        type='text'
                        variant="standard"
                        required
                    />
                    <TextField
                        className='input-element'
                        label="Price"
                        id="filled-size-small"
                        placeholder="Number"
                        variant="filled"
                        size="small"
                        name='title'
                        onChange={handleChange}
                        type='number'
                        variant="standard"
                        required
                    />
                    <TextField
                        className='input-element'
                        label="Desc"
                        id="filled-size-small"
                        placeholder="Description"
                        variant="filled"
                        size="small"
                        name='title'
                        onChange={handleChange}
                        type='text'
                        variant="standard"
                        required
                    />
                    <FormControl className='input-element' variant="standard" sx={{ minWidth: 150 }}>
                        <InputLabel style={{ width: '200px' }} id="demo-simple-select-standard-label" required>In Stock</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name='inStock'
                            onChange={handleChange}
                            label="In Stock"
                            style={{ width: '185px' }}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <button type='submit' className='addProductButton'>Upload</button>
                </form>
                <div className='right'>
                {avatar && <Avatar
                    src={avatar.preview}
                    style={{ height: '500px', width: '500px' }}
                />}
                </div>
            </div>
        </div>
    )
}

export default PreView