import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, UserIcon, FolderIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { useQueryClient } from '@tanstack/react-query';


type NavMenuProps = {
  name: User['name']
}
export default function NavMenu({name} : NavMenuProps) {
  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({queryKey: ['user']})
  }

  return (
    <Popover className="relative px-20">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-900">
        <Bars3Icon className='w-8 h-8 text-white' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full h-screen lg:h-auto lg:w-80 shrink rounded-xl bg-white p-6 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900">
            <p className='text-center mb-4 dark:text-w dark:text-white'>Hola: {name}</p>
            <Link
              to='/profile'
              className='flex items-center p-3 hover:bg-gray-100 rounded-md dark:hover:bg-purple-800'
            >
              <UserIcon className='w-5 h-5 mr-3 text-purple-900 dark:text-white ' />
              <p className='dark:text-white'>Mi Perfil</p>
            </Link>
            <Link
              to='/'
              className='flex items-center p-3 hover:bg-gray-100 rounded-md dark:hover:bg-purple-800'
            >
              <FolderIcon className='w-5 h-5 mr-3 text-purple-900 dark:text-white' />
              <p className='dark:text-white'>Mis Proyectos</p>
            </Link>
            <button
              className='flex items-center p-3 hover:bg-gray-100 rounded-md w-full text-left dark:hover:bg-purple-800'
              type='button'
              onClick={logout}
            >
              <ArrowRightOnRectangleIcon className='w-5 h-5 mr-3 text-purple-900 dark:text-white' />
              <p className='dark:text-white'>Cerrar Sesión</p>
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
