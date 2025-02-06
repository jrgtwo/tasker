import { useContext } from 'react';
import { Link } from 'react-router';
import { usePostNewTaskForm } from './hooks/usePostNewTaskForm'
import { SubmissionState } from './constants/submissionStates';
import { UserLoginContext } from './../../context/UserLogin/UserLoginContext'

const NewTask = () => {
  const  { isLoggedIn } = useContext(UserLoginContext)
  const {
    onTitleChange,
    onDescChange,
    submitTask,
    isSubmitting,
    submissionError
  } = usePostNewTaskForm();

  return (
    <>{
      isLoggedIn
        ?
          <>
          <p><Link to="/tasks">{`<-`} Back to Tasks</Link></p>
            <form className="text-center flex flex-col">
              {
                submissionError &&
                <h3>Sorry There was an error: {`${JSON.stringify(submissionError)}`}</h3>
              }
              
              <input 
                type="text" 
                placeholder="What Do You Need To Do"
                id="title" 
                name="title" 
                onChange={onTitleChange}
                className="bg-white rounded-2xl text-2xl/2 text-slate-600 p-2"
              />
            
            
              {/*<input 
                type="text" 
                id="desc" 
                name="desc" 
                onChange={onDescChange}/>*/}

                <textarea
                placeholder="Add some notes here :)"
                className="bg-white rounded-2xl text-med/2 text-slate-600 p-2 mt-4"
                  ></textarea>
              
              <button 
                disabled={isSubmitting !== SubmissionState.init || !!submissionError} 
                onClick={submitTask}
                className="bg-amber-500/90 w-2xs mx-auto rounded-2xl text-2xl/12 shadow-md shadow-gray-300 block mt-4"  
              >Save Task</button>
            </form>
          </>
        : <p>Please Login</p>
    }
    </>
  )
}

export { NewTask }