import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@utils/utils';

import { TaskStatus } from 'types/index';
import { statusTranslations } from '@locales/es';
import { CheckCircleIcon } from '@heroicons/react/16/solid';
import NotesPanel from '../notes/NotesPanel';





export default function TaskModalDetails() {

    const params = useParams()
    const projectId = params.projectId!

    const navigate = useNavigate()
    const location = useLocation() // Obtiene la URL actual.
    const queryParams = new URLSearchParams(location.search) // Accede a los parámetros de la URL.
    const taskId = queryParams.get('viewTask')! // Obtiene el valor del parámetro 'newTask true / null'.
    const show = taskId ? true : false // Si 'newTask' existe, 'show' es true; si no, es false.

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['detailsProject', projectId] })
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            toast.success(data)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        const data = { projectId, taskId, status }
        mutate(data)
    }

    if (isError) {
        toast.error(error.message, { toastId: 'error' })
        return <Navigate to={`/projects/${projectId}`} />
    }

    if (data) return (
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
                                    <p className='text-sm text-slate-400 dark:text-slate-300'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400 dark:text-slate-300'>Última actualización: {formatDate(data.updatedAt)}</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5 dark:text-white"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2 dark:text-slate-300'>Descripción: {data.description}</p>

                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                                                        Historial de Cambios
                                                    </h2>
                                    {data?.completedBy?.length > 0 ? (

                                        data.completedBy.map((activityLog) => (

                                            <>
                                                <div className="bg-white dark:bg-slate-700 dark:border-gray-800 dark:text-white rounded-lg shadow-md p-4 mb-1">
                                                    
                                                    <div
                                                        key={activityLog._id}
                                                        className="flex items-start space-x-4 py-3 border-b last:border-b-0 border-gray-200 dark:border-gray-800"
                                                    >
                                                        {/* Icono de Headless UI */}
                                                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                                                            <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-300" />
                                                        </div>

                                                        {/* Información */}
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                <span className="font-semibold text-green-600 dark:text-green-300">
                                                                    {statusTranslations[activityLog.status]}
                                                                </span>
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Actualizado por: <span className="font-medium">{activityLog.user.name}</span>
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                                {formatDate(data.updatedAt)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    ) : (
                                        null
                                    )}




                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold dark:text-white'>Estado Actual:</label>
                                        <select
                                            className='w-full mt-2  p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <NotesPanel notes={data.notes}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}