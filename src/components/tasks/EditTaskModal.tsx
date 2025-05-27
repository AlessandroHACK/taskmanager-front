import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { Project, Task, TaskFormData } from 'types';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@api/TaskAPI';
import { toast } from 'react-toastify';

type EditTaskModalProps = {
    data: Task
    projectId: Project['_id']
    taskId: Task['_id']
}

export default function EditTaskModal({ data, projectId, taskId }: EditTaskModalProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
        defaultValues: {
            name: data.name,
            description: data.description
        }
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['detailsProject', projectId] })
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true }) //cerar modal
        }
    })
    const handelEditTask = (formData: TaskFormData) => {
        const data = {projectId, taskId, formData}
        mutate(data)
    }
    const navigate = useNavigate()

    return (
        <Transition appear show={true} as={Fragment}>
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
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold text-gray-600 dark:text-gray-400">Realiza cambios a una tarea en {''}
                                    <span className="text-purple-600">este formulario</span>
                                </p>

                                <form
                                    onSubmit={handleSubmit(handelEditTask)}
                                    className="mt-10 space-y-3"
                                    noValidate
                                >


                                    <TaskForm errors={errors} register={register} />
                                    <input
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 w-full p-3 text-white rounded-lg uppercase font-bold transition-colors cursor-pointer"
                                        value='Actualizar Tarea'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}