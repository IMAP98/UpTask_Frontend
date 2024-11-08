import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";
import api from "@/lib/axios";

export const createAccount = async (formData: UserRegistrationForm) => {
    try {
        const url = "/auth/create-account";
        const {data} = await api.post<string>(url, formData);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const confirmAccount = async (formData: ConfirmToken) => {
    try {
        const url = "/auth/confirm-account";
        const {data} = await api.post<string>(url, formData);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const requestConfirmationCode = async (formData: RequestConfirmationCodeForm) => {
    try {
        const url = "/auth/request-code";
        const {data} = await api.post<string>(url, formData);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const authenticateUser = async (formData: UserLoginForm) => {
    try {
        const url = "/auth/login";
        const {data} = await api.post<string>(url, formData);
        localStorage.setItem('UPTASK_AUTH_TOKEN', data);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const forgotPassword = async (formData: ForgotPasswordForm) => {
    try {
        const url = "/auth/forgot-password";
        const {data} = await api.post<string>(url, formData);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const validateToken = async (formData: ConfirmToken) => {
    try {
        const url = "/auth/validate-token";
        const {data} = await api.post<string>(url, formData);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const updatePasswordWithToken = async ({formData, token}: {formData: NewPasswordForm, token: ConfirmToken["token"]}) => {
    try {
        const url = `/auth/update-password/${token}`;
        const {data} = await api.post<string>(url, formData);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const getUser = async () => {
    try {
        const {data} = await api.get<string>("/auth/user");
        const response = userSchema.safeParse(data);
        
        if (response.success) {
            return response.data;
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}