import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PetForm from './PetForm';
import { useDispatch, useSelector } from 'react-redux';
import { updatePet } from '../redux/slice/petSlice';

const PetModals = ({ show, handleClose, mode, pet }) => {
const dispatch=useDispatch();
const currentUser=useSelector((state)=>state.auth?.currentUser||null);


  const handleSubmit = async(data) => {
    if (mode === 'add') {
      try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('lastSeenLocation', data.lastSeenLocation);
        formData.append('lastSeenDate', data.lastSeenDate);
        formData.append('contactInfo', data.contactInfo);
        formData.append('file', data.imageUrl[0]); 
        let img=  await axios.post('http://localhost:8080/pets/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });  
        const imageUrl =img.data;
        const petData = {
          ...data,
          userId:currentUser?.userId,
          imageUrl: imageUrl,
        };
        dispatch(createPet(petData));
        reset();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else if (mode === 'edit') {
        dispatch(updatePet(data));
    }
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'add' ? 'Add Pet' : mode === 'edit' ? 'Edit Pet' : 'View Pet'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PetForm
            onSubmit={handleSubmit} 
            defaultValues={pet} 
            mode={mode} 
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PetModals;
