import React, { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../redux/firebase'
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
const PreView = () => {
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState()
    const [file, setFile] = useState(null)
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
            <h1>Hello</h1>
            <form onSubmit={handleClick}>
                <label>Upload avatar: </label>
                <input type='file' onChange={handlePreviewAvatar} />
                <label>Title: </label>
                <input name='title' onChange={handleChange} type='text' />
                <label>Desc: </label>
                <input name='desc' onChange={handleChange} type='text' />
                {/* {avatar && (<img src={avatar.preview} alt='preview-img' width='80%' />)} */}
                {avatar && <Avatar
                    src={avatar.preview}
                    style={{ height: '500px', width: '500px' }}
                />}
                <button type='submit' className='addProductButton'>Create</button>
            </form>
        </div>
    )
}

export default PreView