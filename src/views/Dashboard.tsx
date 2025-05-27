import { Link, useLocation, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {  getProjects } from "@api/ProjectAPI";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import { useAuth } from "@hooks/useAuth";
import { isManager } from "@utils/policies";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";


const Dashboard = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const { data: user, isLoading: authLoading } = useAuth()
  //get all projects
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })



  // console.log(data)
  // console.log(user?._id)
  if (isLoading && authLoading) return <div className="min-h-screen text-center justify-center font-bold text-purple-700 text-2xl">Cargando...</div>
  if (data && user) return (
    <>
      <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-800">
        <div className="mb-6">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 dark:text-white">Mis Proyectos</h1>
          <p className="text-xl font-light text-gray-600 mb-6 dark:text-gray-400">Administra tus proyectos</p>
          <Link
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
            to='/projects/create'
          >
            Crear Proyecto
          </Link>
        </div>
        {data.length ? (
          <div className="flex justify-center">
            <ul role="list" className="divide-y w-2/3 divide-gray-200 border border-gray-100 mt-10 bg-white shadow-lg rounded-lg dark:bg-gray-900 dark:border-gray-800 dark:divide-gray-800">
              {data.map((project) => (
                <li key={project._id} className="flex justify-between gap-x-6 px-6 py-12 ">
                  <div className="flex min-w-0 gap-x-4 ">
                    <div className="min-w-0 flex-auto space-y-2 ">
                      <div className="mb-2">
                      {isManager(project.manager, user._id) ? 
                      <p className="text-xs font-bold uppercase bg-slate-100 border-2 text-blue-600 border-blue-600 rounded-lg inline-block py-1 px-5 dark:bg-gray-800 ">Manager</p> : 
                      <p className="text-xs font-bold uppercase bg-slate-100 border-2 text-green-600 border-green-600 rounded-lg inline-block py-1 px-5 dark:bg-gray-800 ">Miembro del equipo</p>
                      }
                      </div>
                      <Link to={`/projects/${project._id}`}
                        className="text-gray-600 cursor-pointer hover:underline hover:text-blue-500 text-3xl font-bold dark:text-purple-500"
                      >{project.projectName}</Link>
                      <p className="text-sm text-gray-400">
                        Cliente: {project.clientName}
                      </p>
                      <p className="text-sm text-gray-400">
                        {project.description}
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
                            <Link to={`/projects/${project._id}`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900 dark:text-white'>
                              Ver Proyecto
                            </Link>
                          </Menu.Item>
                          {isManager(project.manager, user._id)&& (
                            <>
                              <Menu.Item >
                                <Link to={`/projects/${project._id}/edit`}
                                  className='block px-3 py-1 text-sm leading-6 text-gray-900  dark:text-white'>
                                  Editar Proyecto
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  type='button'
                                  className='block px-3 py-1 text-sm leading-6 text-red-500 dark:text-purple-500'
                                  onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                                >
                                  Eliminar Proyecto
                                </button>
                              </Menu.Item>
                            </>)}

                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        ) : (
          <p className="text-center py-20 text-3xl  text-purple-600">Auno no hay proyectos {''}
            <Link to='/projects/create' className="text-blue-500 font-bold underline">Crear Proyecto</Link>
          </p>

        )}
      </div>
        <DeleteProjectModal/>
    </>

  );
}

export default Dashboard;
