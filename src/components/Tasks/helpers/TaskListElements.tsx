import { Link } from 'react-router';
import type { Tasks } from './../Types';

const TaskListElements = ({
  taskList 
}: {
   taskList: Tasks
}) => {
 return (
   <ul>{
     taskList?.map((task, index) => (
       <li key={`${task.title.split(' ').join('')}${index}`}>
         <Link 
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