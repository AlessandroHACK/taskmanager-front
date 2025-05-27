import { useForm } from "react-hook-form";

import ErrorMessage from "@/components/ErrorMessage";
import { UserLoginForm } from "types/index";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@api/AuthAPI";
import { toast } from "react-toastify";

export default function Login() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => { 
      navigate('/')
    }

  })

  const handleLogin = (formData: UserLoginForm) => { mutate(formData) }

  return (
    <>
      <h1 className="text-2xl font-black text-white mt-4">Iniciar sesión</h1>
      <p className="text-xl font-light text-white mt-5">
        Administra tur poryectos {''}
        <span className=" text-white font-extrabold"> Iniciando sesión en este formulario</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white rounded-lg mt-10 shadow-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-2  p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-2  p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-purple-500 hover:bg-purple-600 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
        />
        <nav className="mt-10 flex flex-col justify-center items-center space-y-2">
          <div className="flex items-center">
            <span className="text-gray-400 font-normal">¿No tienes cuenta?</span>
            <Link to='/auth/register' className="text-blue-500 font-bold underline ml-1">Crear una</Link>
          </div>

          <div className="flex items-center">
            <span className="text-gray-400 font-normal">¿Olvidaste tu password?</span>
            <Link to='/auth/forgot-password' className="text-blue-500 font-bold underline ml-1">Restablecer</Link>
          </div>
        </nav>
      </form>


    </>
  )
}