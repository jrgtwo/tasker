import { Link } from 'react-router';

const MainMenu = () => {

    return (
      <>
        <nav>
          <li>
            <Link to={'/tasks'}>Tasker</Link>
          </li>
        </nav>
      </>
    )
}

export { MainMenu }