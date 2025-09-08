import { Link } from "react-router"

const Header = () => {
    const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Practice Questions', path: '/practice-questions' },
    { name: 'Mock Test', path: '/mock-test' },
    { name: 'Resources', path: '/resources' },
    { name: 'Tips and Strategies', path: '/tips-and-strategies' },
    { name: 'About', path: '/about' },
  ]

  return (
    <header className="header">
      <div className="header__logo" role="logo">Scientific Officer</div>

      <nav className="header__nav" role="navigation">
        <ul className="header__nav-list" role="list">
          {navLinks.map(link => (
            <li key={link.path} className="header__nav-item" role="listitem">
              <Link to={link.path} className="header__nav-link">{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header