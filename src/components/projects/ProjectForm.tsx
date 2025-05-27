import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "types";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>;
  errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ errors, register }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5">
        <label
          htmlFor="projectName"
          className="text-sm uppercase font-bold text-gray-700 dark:text-white "
        >
          Nombre del Proyecto
        </label>
        <input
          id="projectName"
          className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("projectName", {
            required: "El Título del Proyecto es obligatorio",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="clientName"
          className="text-sm uppercase font-bold text-gray-700 dark:text-white"
        >
          Nombre Cliente
        </label>
        <input
          id="clientName"
          className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("clientName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="text-sm uppercase font-bold text-gray-700 dark:text-white"
        >
          Descripción
        </label>
        <textarea
          id="description"
          className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white"
          placeholder="Descripción del Proyecto"
          {...register("description", {
            required: "Descripción del proyecto es obligatoria",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
