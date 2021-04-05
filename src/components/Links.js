import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import { toast } from 'react-toastify';
import image from '../assets/no-image1.jpg';

import { data } from '../firebase'

const Links = () => {

    const [Links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('')

    const addOrEditLink = async (LinkObject) => {
        try{
            if(currentId === ''){
                await data.collection('links').doc().set(LinkObject);
                toast('New Link added', { type: 'success', autoClose: 2000 })
            }else{
                await data.collection('links').doc(currentId).update(LinkObject)
                toast('Link Updated Successfully', { type: 'info', autoClose: 2000 });
                setCurrentId('')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onDeleteLink = async id => {
        if (window.confirm('Are you sure you want to delete this link?')) {
            await data.collection('links').doc(id).delete();
            toast('Link Removed Successfully', { type: 'error', autoClose: 2000 })
        }
    }

    const getLinks = async () => {
        data.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
    }

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div>
            <div className="col-md-12 p-2">
                <LinkForm {...{addOrEditLink, currentId, Links}} />
            </div>
            <div className="col-md-12 p-2">
                {Links.map(link => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)} >close</i>
                                    <i className="material-icons" onClick={() => setCurrentId(link.id)} >create</i>
                                </div>
                            </div>
                            <img src={link.file || image} alt="Imagen Web" width="250" height="160"/>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" >Go to Website</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>)
}

export default Links;