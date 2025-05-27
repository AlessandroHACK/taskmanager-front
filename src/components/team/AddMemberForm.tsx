import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "types";
import { findUserByEmail } from "@api/TeamAPI";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formData : TeamMemberForm) => {
        const data = { projectId, formData}
        mutation.mutate(data)
    }


    const resetData = () => {
        reset()
        mutation.reset()
    }
    
    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="text-sm uppercase font-bold text-gray-700 dark:text-white"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="ww-full mt-2  p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white"
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

                <input
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 w-full p-3 text-white rounded-lg uppercase font-bold transition-colors cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>
            {mutation.isPending && <p className="text-center mt-8 dark:text-white">Cargando...</p>}
            {mutation.error && <p className="text-center mt-8 text-red-600">{mutation.error.message}</p>}
            {mutation.data && <SearchResult user={mutation.data} reset={resetData}/>}
        </>
    )
}