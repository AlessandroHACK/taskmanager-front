import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { User, UserFormData } from 'types';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@api/ProfileAPI";
import { toast } from "react-toastify";

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({ defaultValues: data });

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            toast.success(data)
        }
    })
    const handleEditProfile = (formData: UserFormData) => { mutate(formData) };

    return (
        <>
            <div className="min-h-screen">
                <div className="bg-gray-100 p-6 dark:bg-gray-800">
                    <div className="mb-6">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 dark:text-white">Mi Perfil</h1>
                        <p className="text-xl font-light text-gray-600 mb-6 dark:text-gray-400">
                            Aquí puedes actualizar tu información
                        </p>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto">
                    <form
                        onSubmit={handleSubmit(handleEditProfile)}
                        className="mt-2 bg-white shadow-lg p-10 rounded-lg dark:bg-gray-900"
                        noValidate
                    >
                        <div className="mb-5 space-y-3">
                            <label className="text-sm uppercase font-bold text-gray-700 dark:text-white " htmlFor="name">
                                Nombre
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Tu Nombre"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white"
                                {...register("name", {
                                    required: "Nombre de usuario es obligatorio",
                                })}
                            />
                            {errors.name && (
                                <ErrorMessage>{errors.name.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="mb-5 space-y-3">
                            <label className="text-sm uppercase font-bold text-gray-700 dark:text-white " htmlFor="email">
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Tu Email"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white"
                                {...register("email", {
                                    required: "El e-mail es obligatorio",
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
                            value="Guardar Cambios"
                            className="bg-blue-500 hover:bg-blue-600 w-full p-3 text-white rounded-lg uppercase font-bold transition-colors cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
