import React, { useContext, useEffect, useState } from 'react';
import "./AddPartPopup.css";
import { Context } from '../main';
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast';

const AddPartPopup = ({ show, setShow, projectId, onPartAdded }) => {

    const [ allParts, setAllParts ] = useState([]);
    const { loading, setLoading } = useContext(Context);

    useEffect(() => {
        if( show ) {
            fetchParts();
        }
    }, [show]);

    const fetchParts = async () => {
        setLoading(true)
        try{
            const res = await axios.get(`${server}/part/all`, {
                withCredentials: true,
            });
            setAllParts(res.data.parts);
        }catch(error){
            toast.error("Failed to Fetch Parts");
        }
        setLoading(false);
    }


    const handleAddToProject = async (partId) => {
        setLoading(true);
        try{
            await axios.post(`${server}/project/${projectId}/part/${partId}/new`, {}, {
                withCredentials: true,
            });
            toast.success("Part Added to project");
            onPartAdded(); //Props received used to refresh project Parts
            // setShow(false);
        }catch(error){
            toast.error("Failed to add part to project");
        }

        setLoading(false);
    }

    if(!show) return null;

  return (
    <div className='select-part-modal'>
    <div className='modal-content'>
        <h3>Select a Part to Add</h3>
        <ul>
            { allParts.map((part) => (
                <li key={part._id} className='part-item'>
                    <span>{part.title}</span>
                    <button onClick={() => handleAddToProject(part._id)}>Add</button>
                </li>
            ))}
        </ul>
        <button className='aPPCloseButton' onClick={() => setShow(false)} >Close</button>
    </div>
      
    </div>
  )
}

export default AddPartPopup;
