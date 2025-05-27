import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "types"
import { createProject } from "@api/ProjectAPI"
import { toast } from "react-toastify"

const CreateProject = () => {

  const navigate = useNavigate()
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const {mutate} = useMutation({
    mutationFn: createProject,  //funcion a llamar
    onError: (error) => {  //si hay error
      toast.error(error.message)
    },
    onSuccess: (data) => { //si es ok
      toast.success(data)
      navigate('/')
    }
  })

  const handleFomr = (formData: ProjectFormData) => {
    mutate(formData)
  }

  return (
    <>
      <div className="min-h-screen">
      <div className="bg-gray-100 p-6 dark:bg-gray-800">
        <div className="mb-6">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 dark:text-white ">Crear Proyecto</h1>
          <p className="text-xl font-light text-gray-600 mb-6 dark:text-gray-400">AIngresa los datos al formulario</p>
          <Link
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
            to='/'
          >
            Regresar
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto ">
        <form className="mt-2 bg-white shadow-lg p-10 rounded-lg dark:bg-gray-900"
          onSubmit={handleSubmit(handleFomr)}
          noValidate
        >

          <ProjectForm
            register={register}
            errors={errors}
          />
          <input type="submit" value="Crear Proyecto"
            className="bg-blue-500 hover:bg-blue-600 w-full p-3 text-white rounded-lg uppercase font-bold transition-colors cursor-pointer" />
        </form>
      </div>

      </div>
    </>
  )
}

export default CreateProject
