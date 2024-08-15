import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { setError } from "./petSlice";
import { toast } from 'react-toastify';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser:JSON.parse(localStorage.getItem('currentUser'))||null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
        user: null,
        error:null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', state.token);
            state.isAuthenticated = true;
        },
        setCurrentUser:(state,action)=>{
            state.currentUser=action.payload;
            localStorage.setItem('currentUser',JSON.stringify(state.currentUser));
        },
        clearToken: (state) => {
            state.token = null;
            state.currentUser=null;
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            state.isAuthenticated = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setError:(state,action)=>{
            state.error=action.payload;
        }
    }
});
export const { setToken, clearToken ,setUser,setCurrentUser} = authSlice.actions;

export const login = (user) => async (dispatch) => {
    let data = {
        username: user.username,
        password: user.password
    }
    try {
        const response = await axios.post('http://localhost:8080/users/login', data);
        const { userData,token } = response.data;
        dispatch(setToken(token));
        dispatch(setCurrentUser(userData));
        dispatch(setError(null));
        toast.success('Login successful');

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        dispatch(setError(errorMessage));
        console.error('Login failed:', errorMessage);
        toast.error(`Login failed`);

    }
};

export const userRegister = (user) => async (dispatch) => {
    let data = {
        username: user.username,
        email: user.email,
        contact: user.contact,
        password: user.password
    }
    try {
        await axios.post('http://localhost:8080/users/register', data);
    } catch (error) {
        console.error('Registration failed:', error);
    }
};
export const logout = () => (dispatch) => {
    dispatch(clearToken());
};
export const fetchCurrentUser = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:8080/users/currentUser', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        dispatch(setUser(response.data));
    } catch (error) {
        console.error('Failed to fetch current user:', error);
        dispatch(clearToken());
    }
};

export default authSlice.reducer;