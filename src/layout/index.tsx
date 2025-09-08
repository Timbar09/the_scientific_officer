import { Outlet } from "react-router"

import Header from "../components/Header"

const Layout = () => {
  return (
    <div className="App">
      <Header />

      <>
        <Outlet />
      </>
      
      <footer>
        <p>&copy; 2024 The Scientific Officer. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
