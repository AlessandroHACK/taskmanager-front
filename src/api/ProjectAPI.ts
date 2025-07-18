import api from "@lib/axios";
import { isAxiosError } from "axios";
import { DashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from '../types' 


export async function createProject(formData: ProjectFormData) {
   try {
      const { data } = await api.post<string>('/projects', formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function getProjects() {

 
   try {
      const { data } = await api('/projects')
      const response = DashboardProjectSchema.safeParse(data)
      if (response.success) {
         return response.data
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}



export async function getProjectById(id:  Project['_id']) {
   try {
      const { data } = await api(`/projects/${id}`)
      const response = editProjectSchema.safeParse(data)
      if(response.success){
         return response.data
      }

   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function getFullProjectById(id:  Project['_id']) {
   try {
      const { data } = await api(`/projects/${id}`)
      const response = projectSchema.safeParse(data)
      if(response.success){
         return response.data
      }

   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}


type ProyectAPIType = {
   formData: ProjectFormData,
   projectId: Project['_id']
}

export async function updateProject({formData, projectId} : ProyectAPIType) {
   try {
      const { data } = await api.put<string>(`/projects/${projectId}`, formData)
     return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}


export async function deleteProject(id:  Project['_id']) {
   try {
      const { data } = await api.delete(`/projects/${id}`)
     return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}
