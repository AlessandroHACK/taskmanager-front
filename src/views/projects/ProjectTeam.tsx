import AddMemberModal from '@/components/team/AddMemberModal'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProjectTeam, revomeUserFromProject } from '@api/TeamAPI'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'

export default function ProjectTeam() {


    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false
    })




    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: revomeUserFromProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId]})
            toast.success(data)
        }
    })

    if (isLoading) return <div className="min-h-screen text-center justify-center font-bold text-purple-700 text-2xl">Cargando...</div>
    if (isError) return <Navigate to={'/404'} />


    if (data ) return (
        <>
            <div className="min-h-screen">
                <h1 className="text-5xl font-black dark:text-white">Equipo de trabajo</h1>
                <p className="text-2xl font-light text-gray-600 mt-5 dark:text-gray-400">Administra el equipo de trabajo</p>
                <nav className="flex items-center space-x-4">
                    <button className="mt-5 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
                        onClick={() => navigate(location.pathname + '?addMember=true')}>
                        Agregar colaborador
                    </button>
                    <Link
                        className="mt-5 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
                        to={`/projects/${projectId}`}>
                        Volver a proyecto
                    </Link>
                </nav>
                <h2 className="text-5xl font-black my-10 dark:text-white">Miembros actuales</h2>
                {data.length ? (
                    <div className="flex justify-center">
                        <ul role="list" className="divide-y w-2/3 divide-gray-200 border border-gray-100 mt-10 bg-white shadow-lg rounded-lg dark:bg-gray-900 dark:border-gray-800 dark:divide-gray-800">
                            {data.map((member) => (
                                <li key={member._id} className="flex justify-between gap-x-6 px-6 py-12 ">
                                    <div className="flex min-w-0 gap-x-4 ">
                                        <div className="min-w-0 flex-auto space-y-2 ">
                                            <p className="text-gray-600 cursor-pointer hover:underline hover:text-blue-500 text-3xl font-bold dark:text-purple-500">
                                                {member.name}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Email: {member.email}
                                            </p>

                                        </div>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-x-6">
                                        <Menu as="div" className="relative flex-none">
                                            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-purple-500 ">
                                                <span className="sr-only">opciones</span>
                                                <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                            </Menu.Button>
                                            <Transition as={Fragment} enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95">
                                                <Menu.Items
                                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none dark:bg-gray-800"
                                                >

                                                    <Menu.Item>
                                                        <button
                                                            type='button'
                                                            className='block px-3 py-1 text-sm leading-6 text-red-500 dark:text-purple-500'
                                                         onClick={() => mutate({projectId, userId: member._id})}
                                                        >
                                                            Eliminar Proyecto
                                                        </button>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                ) : (
                    <p className="text-center py-20 text-3xl  text-purple-600">Auno no hay miembros {''}
                      
                    </p>

                )}
            </div>

            <AddMemberModal />
        </>
    )

}
