import { getTaskById } from "@api/TaskAPI"
import { useQuery } from "@tanstack/react-query"
import {  Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {
  /**obtener projectId */
    const params = useParams()
    const projectId = params.projectId!

/**obtener taskId */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!
    
    const {data, isError} = useQuery({
      queryKey: ['task', taskId],
      queryFn: () => getTaskById({projectId,taskId}),
      enabled: !!taskId  //solo solo activar la consulta cuando existe taskId
    })

    if(isError) return <Navigate to={'/404'}/>
 
  if(data) return (
    <div>
      <EditTaskModal data={data} projectId={projectId} taskId={taskId}/>
    </div>
  )
}
