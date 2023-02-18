import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword,GoogleAuthProvider,signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import auth from "../../firebase/firebase.config";

export const initialState ={
 user : {
  email : "",
  role : "",
 },
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
export const getUser =createAsyncThunk(
  "auth/getUser", 
  async (email)=>{
     const res =await fetch(`http://localhost:5000/user/${email}`)
     const data =await res.json()
     if(data.status){

       return data
     }
     return email

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
        state.user.email = "" ;
      },
      setUser : (state,action) =>{
        state.user.email =action.payload ;
        state.isLoading =false
      },
      toggleLoading : (state)=>{
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
       state.user.email = payload
       state.isError = false
       state.error = ""
     })
     .addCase(createUser.rejected,(state,action)=>{
      state.isLoading = false
      state.user.email = ""
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
       state.user.email = payload
       state.isError = false
       state.error = ""
     })
     .addCase(logInUser.rejected,(state,action)=>{
      state.isLoading = false
      state.user.email = ""
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
       state.user.email = payload
       state.isError = false
       state.error = ""
     })
     .addCase(googleLogin.rejected,(state,action)=>{
      state.isLoading = false
      state.user.email = ""
      state.isError = true
      state.error = action.error.message
     })

    // getUser method 
     .addCase(getUser.pending, (state)=>{
       state.isLoading =true
       state.isError = false
       state.error =""
     })
     .addCase(getUser.fulfilled, (state,{payload})=>{
       state.isLoading = false;

       if(payload.status){
         
         state.user = payload.data
       }else{
        state.user.email = payload
       }
       state.isError = false
       state.error = ""
     })
     .addCase(getUser.rejected,(state,action)=>{
      state.isLoading = false
      state.user.email = ""
      state.isError = true
      state.error = action.error.message
     })


    }
})

export const {logOut,setUser,toggleLoading} =authSlice.actions
export default authSlice.reducer