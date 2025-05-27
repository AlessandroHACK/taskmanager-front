import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@api/AuthAPI";
import { toast } from "react-toastify";

export default function Register() {

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className="text-2xl font-black text-white mt-4">Crear Cuenta</h1>
      <p className="text-xl font-light text-white mt-5">
        Llena el formulario para {''}
        <span className=" text-white font-extrabold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10 rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full   p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            {...register("email", {
              required: "El Email de registro es obligatorio",
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
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full   p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-purple-600 hover:bg-purple-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
        />

        <nav className="mt-10 flex flex-col justify-center items-center space-y-2">
          <div className="flex items-center">
            <span className="text-gray-400 font-normal">¿Ya tienes cuenta?</span>
            <Link to='/auth/login' className="text-blue-500 font-bold underline ml-1">Inicia sesión</Link>
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