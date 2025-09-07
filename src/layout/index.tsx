import { Outlet, Link } from "react-router"

const Layout = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Practice Questions', path: '/practice-questions' },
    { name: 'Mock Test', path: '/mock-test' },
    { name: 'Resources', path: '/resources' },
    { name: 'Tips and Strategies', path: '/tips-and-strategies' },
    { name: 'About', path: '/about' },
  ]

  return (
    <div className="App">
      <nav>
        <ul>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

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
