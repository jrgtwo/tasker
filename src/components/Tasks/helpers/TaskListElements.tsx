import { Link } from 'react-router';
import type { Tasks } from './../Types';

const TaskListElements = ({
  taskList 
}: {
   taskList: Tasks
}) => {
  return (
    <ul 
      className="w-full p-2 bg-gray-200 mx-auto flex flex-col rounded-xl gap-2 shadow-xl"
    >{
      taskList?.map((task, index) => (
        <li
          key={`${task.title.split(' ').join('')}${index}`}
          className="bg-white w-full rounded-xl hover:inset-shadow hover:inset-shadow-blue-100/50 hover:inset-shadow-sm hover:shadow-sm text-left"
        >
          <Link 
            className="text-gray-600 p-2 w-full h-full block"
            to={`/tasks/${task.id}`} 
          >{
            task.title
          }</Link>
        </li>
      ))
    }</ul>
  )
}

export { TaskListElements }