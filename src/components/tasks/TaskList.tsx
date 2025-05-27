import { TaskProject } from 'types'
import TaskCard from './TaskCard'
import { statusTranslations } from '@locales/es'



type TaskListProps = {
    tasks: TaskProject[]
    canEdit: boolean
}

type GroupTasks = {
    [key: string]: TaskProject[]
}

const initailStatusGroups: GroupTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}


const statusStyles: { [key: string]: string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-violet-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-cyan-500',
    completed: 'border-t-green-500'
}


export default function TaskList({ tasks, canEdit }: TaskListProps) {



    //agrupar las tarreas segun su estado 
    const groupedTasks = tasks.reduce((acc, task) => {
        //erificar si el grupo ya existe en el acumulador
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        //Agregar el task al grupo correspondiente
        currentGroup = [...currentGroup, task]
        //Actualizar el acumulador
        return { ...acc, [task.status]: currentGroup };
    }, initailStatusGroups);


    return (
        <>
            <h2 className="text-5xl font-black my-10 dark:text-white">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
               


                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[250px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3 className={`capitalize text-xl font-medium  rounded-lg text-center 
                        bg-white p-3 space-y-5 border-t-8 ${statusStyles[status]} dark:bg-slate-600 dark:text-white`}>{statusTranslations[status]}</h3>
                           
                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-xl font-bold text-gray-500 text-center pt-3 dark:text-gray-400">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
    
            </div>
        </>
    )
}
