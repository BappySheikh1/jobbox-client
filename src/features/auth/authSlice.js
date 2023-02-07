import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword,GoogleAuthProvider,signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import auth from "../../firebase/firebase.config";

export const initialState ={
  email : "",
  role : "",
  isLoading : true,
  isError : false,
  error : "",
};

export const createUser =createAsyncThunk(
  "auth/createUser", 
  async ({email,password})=>{
     const data =await createUserWithEmailAndPassword(auth, email, password)
     return data.user.email
})
export const logInUser =createAsyncThunk(
  "auth/logInUser", 
  async ({email,password})=>{
     const data =await signInWithEmailAndPassword(auth, email, password)
     return data.user.email
})
export const googleLogin =createAsyncThunk(
  "auth/googleLogin", 
  async ()=>{
    const googleProvider = new GoogleAuthProvider()
     const data =await signInWithPopup(auth, googleProvider)
     return data.user.email
})

const authSlice = createSlice({
    name : 'auth',
    reducers :{
      logOut: (state)=>{
        state.email = "" ;
      },
      setUser : (state,action) =>{
        state.email =action.payload ;
        state.isLoading =false
      }
    },
    initialState,
    extraReducers : (builder)=>{
     builder 
     .addCase(createUser.pending, (state)=>{
       state.isLoading =true
       state.isError = false
       state.error =""
     })
     .addCase(createUser.fulfilled, (state,{payload})=>{
       state.isLoading = false
       state.email = payload
       state.isError = false
       state.error = ""
     })
     .addCase(createUser.rejected,(state,action)=>{
      state.isLoading = false
      state.email = ""
      state.isError = true
      state.error = action.error.message
     })

    //  Login method 
     .addCase(logInUser.pending, (state)=>{
       state.isLoading =true
       state.isError = false
       state.error =""
     })
     .addCase(logInUser.fulfilled, (state,{payload})=>{
       state.isLoading = false
       state.email = payload
       state.isError = false
       state.error = ""
     })
     .addCase(logInUser.rejected,(state,action)=>{
      state.isLoading = false
      state.email = ""
      state.isError = true
      state.error = action.error.message
     })
    // google Login method 
     .addCase(googleLogin.pending, (state)=>{
       state.isLoading =true
       state.isError = false
       state.error =""
     })
     .addCase(googleLogin.fulfilled, (state,{payload})=>{
       state.isLoading = false
       state.email = payload
       state.isError = false
       state.error = ""
     })
     .addCase(googleLogin.rejected,(state,action)=>{
      state.isLoading = false
      state.email = ""
      state.isError = true
      state.error = action.error.message
     })


    }
})

export const {logOut,setUser} =authSlice.actions
export default authSlice.reducer