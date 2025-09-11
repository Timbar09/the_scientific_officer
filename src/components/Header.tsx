import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Practice Questions", path: "/practice-questions" },
    { name: "Mock Test", path: "/mock-test" },
    { name: "Resources", path: "/resources" },
    { name: "Tips and Strategies", path: "/tips-and-strategies" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="header p-3">
      <div className="container flex ai-center jc-between">
        <div className="header__logo" role="logo">
          Scientific Officer
        </div>

        <nav
          className={`header__nav ${isNavOpen ? "open" : "closed"}`}
          role="navigation"
        >
          <button
            className="header__nav--toggle__button grid p-1"
            aria-label="Toggle navigation menu"
            aria-expanded={isNavOpen}
            aria-controls="navigation-list"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="material-symbols-outlined">
              {isNavOpen ? "close" : "menu"}
            </span>
          </button>

          <ul
            className="header__nav--list flex flex-col flex-@md-row ai-center gap-1"
            role="navigation"
            id="navigation-list"
          >
            {navLinks.map((link) => (
              <li key={link.path} className="header__nav-item" role="listitem">
                <Link to={link.path} className="header__nav-link">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
