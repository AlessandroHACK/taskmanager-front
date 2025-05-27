import NavMenu from "@/components/NavMenu"
import { useAuth } from "@hooks/useAuth"

import { Link, Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppLayout = () => {

  //proteger panel
  const { data, isError, isLoading} = useAuth()
  if(isLoading) return <div className="min-h-screen my-60 text-center justify-center font-bold text-purple-700 text-2xl">Cargando...</div>
  if(isError) {
      return <Navigate to='/auth/login' />
  }
 if(data) return (
    <>
      <header className="bg-white shadow-sm py-5 px-5 lg:px-10 dark:bg-gray-900">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="flex w-full justify-between items-center lg:w-64">
            <Link to={'/'}>
              <h1 className="text-blue-500 font-bold text-3xl dark:text-white ">TaskManager</h1>
            </Link>
            <div className="lg:hidden">
              <NavMenu  name={data.name} />
            </div>
          </div>
          <div className="hidden lg:flex">
            <NavMenu  name={data.name}/>
          </div>
          
        </div>
      </header>

      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5 bg-white shadow-sm dark:bg-gray-900">
        <p className="text-center text-gray-400 font-bold">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  )
}

export default AppLayout
