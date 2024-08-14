import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createPet } from '../redux/slice/petSlice';

function PetForm() {
  const dispatch = useDispatch();
  const currentUser=useSelector((state)=>state.auth?.currentUser||null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
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
  };

  return (
    <>
      <h1>Add New Pet</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" {...register('name', { required: 'Name is required' })} />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div>
          <label>Description</label>
          <textarea {...register('description')} />
        </div>
        <div>
          <label>Last Seen Location</label>
          <input type="text" {...register('lastSeenLocation')} />
        </div>
        <div>
          <label>Date Missing</label>
          <input type="date" {...register('lastSeenDate')} />
        </div>
        <div>
          <label>Contact Information</label>
          <input type="text" {...register('contactInfo')} />
        </div>
        <div>
          <label>Photo</label>
          <input type="file" {...register('imageUrl')} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PetForm;
