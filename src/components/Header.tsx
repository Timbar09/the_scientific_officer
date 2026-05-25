import Nav from "./Nav";

const Header = () => {
  return (
    <header className="header p-block-3" role="banner">
      <div className="container flex ai-center jc-between p-inline-@md-3">
        <div
          className="header__logo p-block-1 p-inline-3 p-block-@md-0 fw-bold clr-primary-900"
          role="logo"
        >
          The Scientific Officer
        </div>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
