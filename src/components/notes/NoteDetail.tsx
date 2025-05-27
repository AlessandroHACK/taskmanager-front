import { Note } from "types";
import { UserIcon } from "@heroicons/react/20/solid";
import { formatDate } from "@utils/utils";
import { useAuth } from "@hooks/useAuth";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@api/NoteAPI";
import { toast } from "react-toastify";

type NoteDetailProps = {
    note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    /**Obtener projectId */
    const params = useParams()
    const projectId = params.projectId!
    // console.log(params.projectId)


    /**obtener taskId */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    // console.log(queryParams.get('viewTask'))

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            toast.success(data)
        }
    })

    if (isLoading) return <div className="min-h-screen my-60 text-center justify-center font-bold text-purple-700 text-2xl">Cargando...</div>

    return (
        <div className="bg-white dark:bg-slate-700 dark:text-white rounded-lg shadow-md p-4 mb-2">
            <div className="flex items-center mb-2">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-slate-500 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                    </div>
                </div>
                <div className="ml-3">
                    <h2 className="text-xs text-gray-700 dark:text-white font-bold">
                        {note.createdBy.name}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(note.createdAt)}
                    </p>
                </div>
            </div>

            <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                {note.content}
            </div>

            {canDelete && (
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                        onClick={() => mutate({projectId, taskId, noteId: note._id})}
                        >
                        Eliminar
                    </button>
                </div>
            )}
        </div>

    );
}
