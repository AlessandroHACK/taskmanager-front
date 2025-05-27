import api from "@lib/axios";
import { UpdateCurrentUserPasswordForm, UserFormData } from  "../types/index";
import { isAxiosError } from "axios";
export async function updateProfile(formData: UserFormData) {
    try {
        const { data } = await api.put<string>('/auth/profile', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
    try {
        const { data } = await api.post<string>('/auth/update-password', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}