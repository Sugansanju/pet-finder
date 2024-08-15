import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const petSlice = createSlice({
    name: 'pets',
    initialState: {
        pets: [],
        pet:null,
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
    },
    reducers: {
        setPets: (state, action) => {
            state.pets = action.payload;
        },
        addPet: (state, action) => {
            state.pets.push(action.payload);
        },
        setPet: (state, action) => {
            state.pet = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        removePet: (state, action) => {
          state.pets = state.pets.filter(pet => pet.petId !== action.payload);
        },
    },
});

export const { setPets,setPet, addPet, setStatus, setError,removePet } = petSlice.actions;

export const fetchPets = () => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        const response = await axios.get('http://localhost:8080/pets/all');
        dispatch(setPets(response.data));
        dispatch(setStatus('succeeded'));

    } catch (error) {
        dispatch(setError(error.toString()));
        dispatch(setStatus('failed'));

    }
};

export const fetchPetById = (id) => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        const response = await axios.get(`http://localhost:8080/pets/${id}`);
        dispatch(setPet(response.data));
        console.log("Single Pet",response.data)
        dispatch(setStatus('succeeded'));
    } catch (error) {
        dispatch(setError(error.toString()));
        dispatch(setStatus('failed'));
    }
};


export const createPet = (pet) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/pets/add', pet);
        dispatch(addPet(response.data));
        toast.success('Pet added successfully');

        dispatch(fetchPets());
    } catch (error) {
        toast.error('Pet added failed');

        dispatch(setError(error.toString()));
    }
};

export const updatePet = (pet) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('name', pet.name);
      formData.append('description', pet.description);
      formData.append('lastSeenLocation', pet.lastSeenLocation);
      formData.append('lastSeenDate', pet.lastSeenDate);
      formData.append('contactInfo', pet.contactInfo);
      formData.append('file', pet.imageUrl[0]); // Assuming photo is a file input

      // Assuming pet.imageUrl is a File object (e.g., from an <input type="file" /> element)
      if (pet.imageUrl[0]) {
        formData.append("imageUrl", pet.imageUrl[0]); // File input
      }
  
      const response = await axios.put(`http://localhost:8080/pets/${pet.petId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl =response.data;
  
      // Create pet data with image URL
      const petData = {
        ...pet,
        userId:pet.user?.userId,
        imageUrl: imageUrl,
      };
      toast.success('Pet updated successfully');

      dispatch(fetchPets()); // Refresh the list of pets after updating
    } catch (error) {
      dispatch(setError(error.toString()));
      toast.error('Pet updated failed');

    }
  };
  export const deletePet = (petId) => async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/pets/${petId}`);
      dispatch(removePet(petId));
      // toast.success('Pet removed successfully');

    } catch (error) {
      dispatch(setError(error.toString()));
      // toast.error('Pet removed failed');

    }
  };

export default petSlice.reducer;
