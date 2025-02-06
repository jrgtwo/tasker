import { Link } from 'react-router'
import { UserLoginSection } from "../../User/UserLoginSection"
import { MainMenu } from "../MainMenu/MainMenu"

const MainHeader = () => {

  return (
    <header className="h-min backdrop-brightness-50">
      
        <h1 className="text-center ">
          <Link 
            to="/" 
            className="text-zinc-200 mx-auto text-5xl/24 font-black">
            {/*Tasker*/}-
          </Link>
        </h1>
      
      <UserLoginSection/>
    </header>
  )
}

export { MainHeader }