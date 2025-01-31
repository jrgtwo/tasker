import {useState } from 'react';
const NEW_TASK_URL = 'http://localhost:5150/tasks/new';

const NewTask = () => {
  const [title, setTitle] = useState<string | null>(null)
  const [desc, setDesc] = useState<string | null>(null)

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value)
  }

  const submitTask = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {

      const req = await fetch(NEW_TASK_URL, {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          desc: desc
        })
      });
      const res = await req.json()
      console.log('It worked!', res);
    }catch(err) {
      console.log('There was err: ', err);
    }
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor='title'>Title</label>
          <input type="text" id="title" name="title" onChange={onTitleChange}/>
        </div>
        <div>
          <label htmlFor='desc'>Description</label>
          <input type="text" id="desc" name="desc" onChange={onDescChange}/>
        </div>
        <button onClick={submitTask}>Submit Task</button>
      </form>
      
    </>
  )
}

export { NewTask }