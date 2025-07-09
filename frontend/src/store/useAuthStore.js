import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {toast} from "react-hot-toast";
import { AwardIcon } from "lucide-react";
export const useAuthStore = create((set)=>({
    authUser:null, 
    isSigningUp:false,
    isLoggingIn: false,
    isCheckingAuth:true,

    checkAuth: async () => {
        set({isCheckingAuth:true})
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in checkAuth", error.message)
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signUp: async (data) => {
        set({isSigningUp:true})
        try {
            const res =  await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data})
            toast.success("Account created successfully")
        }catch(error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false})
        }
    },
    logout: async (data) => {
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null});
            toast.success("Logged out succesfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } 
    },
    login: async (data) => {
        set({isLoggingIn:true})
        try {
            const res= await axiosInstance.post("/auth/login", data);
            set({authUser: res.data})
            toast.success("Loggin successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isLoggingIn: false})
        }
    }
}))