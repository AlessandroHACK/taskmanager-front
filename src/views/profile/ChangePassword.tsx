import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation} from "@tanstack/react-query";
import { changePassword } from "@api/ProfileAPI";
import { toast } from "react-toastify";
import { UpdateCurrentUserPasswordForm } from "types";

export default function ChangePassword() {
  const initialValues :UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  };

  const { register, handleSubmit, watch,reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const password = watch('password');


    const { mutate } = useMutation({
        mutationFn: changePassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })
  const handleChangePassword = (formData : UpdateCurrentUserPasswordForm) => { mutate(formData) };

  return (
    <>
      <div className="min-h-screen">
        <div className="bg-gray-100 p-6 dark:bg-gray-800">
          <div className="mb-6">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 dark:text-white">Cambiar Password</h1>
            <p className="text-xl font-light text-gray-600 mb-6 dark:text-gray-400">
              Utiliza este formulario para cambiar tu password.
            </p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="mt-2 bg-white shadow-lg p-10 rounded-lg dark:bg-gray-900"
            noValidate
          >
            <div className="mb-5 space-y-3">
              <label
                className="text-sm uppercase font-bold text-gray-700 dark:text-white"
                htmlFor="current_password"
              >
                Password Actual
              </label>
              <input
                id="current_password"
                type="password"
                placeholder="Password Actual"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white"
                {...register("current_password", {
                  required: "El password actual es obligatorio",
                })}
              />
              {errors.current_password && (
                <ErrorMessage>{errors.current_password.message}</ErrorMessage>
              )}
            </div>

            <div className="mb-5 space-y-3">
              <label
                className="text-sm uppercase font-bold text-gray-700 dark:text-white"
                htmlFor="password"
              >
                Nuevo Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Nuevo Password"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white"
                {...register("password", {
                  required: "El Nuevo Password es obligatorio",
                  minLength: {
                    value: 8,
                    message: 'El Password debe ser mínimo de 8 caracteres',
                  },
                })}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            <div className="mb-5 space-y-3">
              <label
                htmlFor="password_confirmation"
                className="text-sm uppercase font-bold text-gray-700 dark:text-white"
              >
                Repetir Password
              </label>
              <input
                id="password_confirmation"
                type="password"
                placeholder="Repetir Password"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white"
                {...register("password_confirmation", {
                  required: "Este campo es obligatorio",
                  validate: value => value === password || 'Los Passwords no son iguales',
                })}
              />
              {errors.password_confirmation && (
                <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
              )}
            </div>

            <input
              type="submit"
              value="Cambiar Password"
              className="bg-blue-500 hover:bg-blue-600 w-full p-3 text-white rounded-lg uppercase font-bold transition-colors cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
}
