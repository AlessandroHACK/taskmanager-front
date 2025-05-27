
import { Task } from 'types'
import AddNoteForm from './AddNoteForm'
import NoteDetail from './NoteDetail'

type NotesPanelProps = {
    notes: Task['notes']
}
export default function NotesPanel({ notes }: NotesPanelProps) {
    return (
        <>
            <AddNoteForm />
            <div className=' mt-10'>
            {notes.length ? (
                <>
                <p className='font-bold my-5 dark:text-white'>Notas:</p>
                {notes.map(note => <NoteDetail key={note._id} note={note}/>)}
                </>
            ): <p className='text-center pt-3 dark:text-white'>No hay notas</p>}
            </div>
        </>
    )
}
