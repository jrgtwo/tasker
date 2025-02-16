import { Link } from 'react-router';
import type { Tasks } from './../Types';

const TaskListElements = ({
  taskList 
}: {
   taskList: Tasks
}) => {
  return (
    <ul 
      className="bg-slate-800/20 w-full py-4 px-4 mt-8 border-1 border-white/10 mx-auto flex flex-col rounded-lg gap-8 "
    >{
      taskList?.map((task, index) => (
        <li
          key={`${task.title.split(' ').join('')}${index}`}
          className="bg-slate-800/20 hover:bg-slate-900/20  border-white/15 border-1 w-full rounded-lg text-left shadow-sm hover:shadow-md shadow-black hover:inset-shadow hover:inset-shadow-slate-900/10 hover:inset-shadow-xs "
        >
          <Link 
            className="opacity-70 hover:opacity-100 text-white px-4 py-4 w-full h-full block font-semibold"
            to={`/tasks/${task.id}`} >
            { task.title }
          </Link>
        </li>
      ))
    }</ul>
  )
}

export { TaskListElements }