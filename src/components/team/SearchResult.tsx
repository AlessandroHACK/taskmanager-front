import { UserIcon } from "@heroicons/react/20/solid"
import { TeamMember } from "types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addUserToProject } from "@api/TeamAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type SearchResultProps = {
    user: TeamMember
    reset : ()=> void
}
export default function SearchResult({ user, reset }: SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            //invalidar query
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId]})
            toast.success(data)
            reset()
        }
    })

  const handleAddUserToProject = () => {
    const data = {
        projectId,
        id: user._id
    }
    mutate(data)
}
    return (
        <>
            <p className="mt-8 text-center font-bold dark:text-white">Resultado de busqueda</p>
            <div className="flex items-center justify-center w-full mt-5">
                <div className="w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center">
                    <UserIcon className="w-7 h-7 text-white" />
                </div>
                <p className="font-bold ml-5 dark:text-white">{user.name}</p>
                <button className="text-purple-600 hover:text-purple-700 px-10 py-3 font-bold cursor-pointer"
                    onClick={handleAddUserToProject}
                >
                    Agregar al proyecto
                </button>
            </div>

        </>
    )
}
