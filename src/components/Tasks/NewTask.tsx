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
            <form>
              {
                submissionError &&
                <h3>Sorry There was an error: {`${JSON.stringify(submissionError)}`}</h3>
              }
              <div>
                <label htmlFor='title'>Title</label>
                <input type="text" id="title" name="title" onChange={onTitleChange}/>
              </div>
              <div>
                <label htmlFor='desc'>Description</label>
                <input type="text" id="desc" name="desc" onChange={onDescChange}/>
              </div>
              <button 
                disabled={isSubmitting !== SubmissionState.init || !!submissionError} 
                onClick={submitTask}>Submit Task</button>
            </form>
          </>
        : <p>Please Login</p>
    }
    </>
  )
}

export { NewTask }