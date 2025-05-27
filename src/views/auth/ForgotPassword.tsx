import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPassword() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => { mutate(formData) }


    return (
        <>

            <h1 className="text-2xl font-black text-white mt-4">Restablecer password</h1>
            <p className="text-xl font-light text-white mt-5">
                ¿Olvidaste tu password? coloca tu email {''}
                <span className=" text-white font-extrabold"> Y restablce tu password</span>
            </p>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10  bg-white rounded-lg mt-10"
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
                        className="w-full mt-2  p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
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

                <input
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-purple-500 hover:bg-purple-600 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
                />

                <nav className="mt-10 flex flex-col justify-center items-center space-y-2">
                    <div className="flex items-center">
                        <span className="text-gray-400 font-normal">¿Ya tienes cuenta?</span>
                        <Link to='/auth/login' className="text-blue-500 font-bold underline ml-1">Inicia sesión</Link>
                    </div>

                    <div className="flex items-center">
                        <span className="text-gray-400 font-normal">¿No tienes cuenta?</span>
                        <Link to='/auth/register' className="text-blue-500 font-bold underline ml-1">Crear una</Link>
                    </div>
                </nav>

            </form>


        </>
    )
}