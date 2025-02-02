import { Link } from 'react-router';

const Home = () => {
  return (
    <>
      <h1>Home!</h1>
      
      <h4>Menu</h4>
      <ul>
        <li><Link to="/tasks">Tasks</Link></li>
      </ul>
    </>
  )
}

export  { Home }