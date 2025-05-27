import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskList from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { getFullProjectById } from "@api/ProjectAPI"
import { useAuth } from "@hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { isManager } from "@utils/policies"
import { useMemo } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"



export default function ProjectDetails() {

    const { data: user, isLoading: authLoading } = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    /**Obtener el proyecto por id */
    const { data, isLoading, isError } = useQuery({
        queryKey: ['detailsProject', projectId],
        queryFn: () => getFullProjectById(projectId),
        retry: false
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])
    // console.log(canEdit)

    if (isLoading && authLoading) return <div className="min-h-screen text-center justify-center font-bold text-purple-700 text-2xl">Cargando...</div>
    if (isError) return <Navigate to='/404' />

    if (data && user) return (

        <>
            <div className="min-h-screen">
                <h1 className="text-5xl font-black dark:text-white">{data.projectName}</h1>
                <p className="text-2xl font-light text-gray-600 mt-5 dark:text-gray-400">{data.description}</p>
                {isManager(data.manager, user._id) && (
                    <nav className="flex items-center space-x-4">
                        <button className="mt-5 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
                            onClick={() => navigate(location.pathname + '?newTask=true')}>
                            Agregar tarea
                        </button>
                        <Link
                            className="mt-5 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
                            to="team">
                            Colaboradores
                        </Link>
                    </nav>
                )}




                <TaskList
                    tasks={data.tasks}
                    canEdit={canEdit}
                />
                <AddTaskModal />
                <EditTaskData />
                <TaskModalDetails />
            </div>

        </>
    )
}
