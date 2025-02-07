import { Link } from 'react-router';

const MainMenu = () => {

    return (
      <>
        <nav className="flex bg-slate-920 outline-1 outline-white/10 ">
          <Link 
            to={'/tasks'}
            className="p-4 border-r-1 border-white/10 hover:bg-black font-stretch-semi-condensed"
          >Your Tasks</Link>
          <Link 
            to={'/tasks/new'}
            className="p-4 border-r-1 border-white/10 hover:bg-black font-stretch-semi-condensed"
          >Add a New Task</Link>
        </nav>
      </>
    )
}

export { MainMenu }