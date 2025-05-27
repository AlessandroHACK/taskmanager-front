import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import { TaskFormData } from 'types'; 
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@api/TaskAPI';
import { toast } from 'react-toastify';
export default function AddTaskModal() {

    /**leer si modal existe */
    const navigate = useNavigate()
    const location = useLocation() // Obtiene la URL actual.
    const queryParams = new URLSearchParams(location.search) // Accede a los parámetros de la URL.
    const taskModal = queryParams.get('newTask') // Obtiene el valor del parámetro 'newTask true / null'.
    const show = taskModal ? true : false // Si 'newTask' existe, 'show' es true; si no, es false.

    /**Obtener projectId */
    const params = useParams()
    const projectId = params.projectId!

    const initialValues : TaskFormData ={
        name: '',
        description:''
    }
    const {register, handleSubmit, reset ,formState:{errors}} = useForm({defaultValues: initialValues})
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createTask ,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:['detailsProject', projectId]})
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true }) //cerar modal
        }
    })

    const handleCreateTask = (formData: TaskFormData) =>{
       const data = {
        formData,
        projectId
       }
       mutate(data)
    }
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16 dark:bg-gray-900">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5 dark:text-white"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold text-gray-600 dark:text-gray-400">Llena el formulario y crea  {''}
                                        <span className="text-purple-600">una tarea</span>
                                    </p>

                                    <form className='mt-10 space-y-3'
                                        noValidate
                                        onSubmit={handleSubmit(handleCreateTask)}
                                    >
                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        />
                                        <input type="submit"
                                            value="Crear Tarea"
                                            className="bg-blue-500 hover:bg-blue-600 w-full p-3 text-white rounded-lg uppercase font-bold transition-colors cursor-pointer"
                                        />

                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}