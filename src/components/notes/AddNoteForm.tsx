import { NoteFormData } from 'types';
import { useForm } from "react-hook-form"
import ErrorMessage from '../ErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@api/NoteAPI';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';

export default function AddNoteForm() {

    /**Obtener projectId */
    const params = useParams()
    const projectId = params.projectId!
    // console.log(params.projectId)


    /**obtener taskId */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    // console.log(queryParams.get('viewTask'))

    const initialvvalues: NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialvvalues })
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            toast.success(data)
        }
    })
    const handleAddNote = (formData: NoteFormData) => {
        const data = {
            formData,
            projectId,
            taskId
        }
        mutate(data)
        reset()
    }
    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className='space-y-3'
            noValidate
        >
            <div className='flex flex-col gap-2'>
                <label className='text-sm  font-bold text-gray-700 dark:text-white' htmlFor='content'>Crear Nota</label>
                <input id='content' type='text' placeholder='Contenido de la nota' className='w-full mt-2  p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition dark:bg-slate-700 dark:border-gray-800 dark:text-white'
                    {...register('content', {
                        required: 'El contenido de la nota es obligatorio'
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input type='submit' value='Crear nota' className="bg-blue-500 hover:bg-blue-600 w-full p-3 text-white rounded-lg uppercase font-bold transition-colors cursor-pointer" />

        </form>
    )
}
