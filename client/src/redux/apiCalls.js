import { publicRequest } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess } from "./userSlice"

export const login = async (dispatch, userCredential) =>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post('/auth/login',userCredential)
        dispatch(loginSuccess(res.data))
    }   
    catch(err){
        dispatch(loginFailure(err))
    }
}