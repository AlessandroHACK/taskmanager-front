
import { Project, ProjectFormData } from "types"
import ProjectForm from './ProjectForm'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@api/ProjectAPI"
import { toast } from "react-toastify"

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
}

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description
        }
    }) //react hook form 

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {  //si hay error
            toast.error(error.message)
        },
        onSuccess: (data) => { //si es ok
            //query refresh
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            
            toast.success(data)
            navigate('/')
        }
    })

    const handleFomr = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }
    return (
        <>
            <div className="min-h-screen">
                <div className="bg-gray-100 p-6 dark:bg-gray-800">
                    <div className="mb-6">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 dark:text-white">Editar Proyecto</h1>
                        <p className="text-xl font-light text-gray-600 mb-6 dark:text-gray-400">Ingresa la nueva información para editar</p>
                        <Link
                            className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
                            to='/'
                        >
                            Regresar
                        </Link>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto ">
                    <form className="mt-10 bg-white shadow-lg p-10 rounded-lg dark:bg-gray-900"
                        onSubmit={handleSubmit(handleFomr)}
                        noValidate
                    >

                        <ProjectForm
                            register={register}
                            errors={errors}
                        />
                        <input type="submit" value="Guardar Cambios"
                            className="bg-blue-500 hover:bg-blue-600 w-full p-3 text-white rounded-lg uppercase font-bold transition-colors cursor-pointer" />
                    </form>
                </div>

            </div>
        </>
    )
}
