import React, { useState, useEffect } from 'react';
import { db, data } from '../firebase';
import image from '../assets/no-image1.jpg';

const LinkForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: '',
        file: null,
    }
    const [fileUrl, setFileUrl] = React.useState(null);
    const [values, setValues] = useState(initialStateValues);

    const onFileChange = async (e) => {
        const file = e.target.files[0]
        console.log(file);
        const storageRef = db.ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())
        setValues({ ...values, file: fileUrl })
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setValues({ ...values, [name]: value, file: fileUrl })
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({ ...initialStateValues })
    }

    const getLinkById = async (id) => {
        const doc = await data.collection('links').doc(id).get();
        setValues({ ...doc.data() })
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...initialStateValues })
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId])


    return (
        <form className="card card-body" onSubmit={handleSubmit} >
            <div className="form-group input-grop">
                <input type="file" className="d-none" name="image" onChange={onFileChange} id="photoInput"  />
                <img src={values.file || image} alt="Imagen Web" width="250" height="160" onClick={() => document.getElementById("photoInput").click()} />
            </div>
            <div className="form-group input-group" >
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className="form-control" placeholder="https://someurl.com" name="url" onChange={handleInputChange} value={values.url} />
            </div>
            <div className="form-group input-group" >
                <div className="input-group-text bg-light" >
                    <i className="material-icons">create</i>
                </div>
                <input type="text" className="form-control" name="name" placeholder="Website name" onChange={handleInputChange} value={values.name} />
            </div>
            <div className="form-group">
                <textarea name="description" rows="3" className="form-control" placeholder="Write a description" onChange={handleInputChange} value={values.description} ></textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
    )
}

export default LinkForm;