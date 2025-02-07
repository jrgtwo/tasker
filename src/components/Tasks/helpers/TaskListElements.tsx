import { Link } from 'react-router';
import type { Tasks } from './../Types';

const TaskListElements = ({
  taskList 
}: {
   taskList: Tasks
}) => {
  return (
    <ul 
      className="w-full py-4 px-4 mt-8 outline-1 outline-white/10 mx-auto flex flex-col rounded-lg gap-8 "
    >{
      taskList?.map((task, index) => (
        <li
          key={`${task.title.split(' ').join('')}${index}`}
          className="bg-slate-900/50 hover:bg-linear-to-b from-slate-800/50 to-slate-900 outline-offset-1 outline-white/15 outline w-full rounded-lg text-left hover:shadow-md hover:shadow-slate-950 hover:inset-shadow hover:inset-shadow-slate-900/10 hover:inset-shadow-xs "
        >
          <Link 
            className="text-white px-4 py-4 w-full h-full block font-semibold"
            to={`/tasks/${task.id}`} >
            <input 
              type="checkbox" 
              className="mr-2"
              />
            { task.title }
          </Link>
        </li>
      ))
    }</ul>
  )
}

export { TaskListElements }