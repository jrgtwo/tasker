import { UserLoginSection } from "../../User/UserLoginSection"
import { MainMenu } from "../MainMenu/MainMenu"

const MainHeader = () => {

  return (
    <header>
      <UserLoginSection />
      <MainMenu />
    </header>
  )
}

export { MainHeader }