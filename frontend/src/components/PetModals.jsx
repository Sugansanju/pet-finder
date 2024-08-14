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
        // Create a FormData object to handle file upload
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('lastSeenLocation', data.lastSeenLocation);
        formData.append('lastSeenDate', data.lastSeenDate);
        formData.append('contactInfo', data.contactInfo);
        formData.append('file', data.imageUrl[0]); // Assuming photo is a file input
  
        // Upload the file
      let img=  await axios.post('http://localhost:8080/pets/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Assuming the URL of the uploaded image is returned or stored somewhere
        const imageUrl =img.data;
  
        // Create pet data with image URL
        const petData = {
          ...data,
          userId:currentUser?.userId,
          imageUrl: imageUrl,
        };
  
        // Dispatch the createPet action with form data
        dispatch(createPet(petData));
  
        // Clear form fields
        reset();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else if (mode === 'edit') {
        console.log("==edit modal",data)
        dispatch(updatePet(data));
      // Handle editing an existing pet
    }
    handleClose();
  };

  return (
    <>
      {/* <Button onClick={() => handleShow('add')}>Add New Pet</Button> */}

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
