import Nav from "./Nav";
import Container from "./Container";

const Header = () => {
  return (
    <header className="header p-block-3" role="banner">
      <Container className="flex ai-center jc-between p-inline-@md-3" size="lg">
        <Logo />

        <Nav />
      </Container>
    </header>
  );
};

const Logo = () => {
  return (
    <div
      className="header__logo p-block-1 p-inline-3 p-block-@md-0 fw-bold clr-primary-900"
      role="logo"
    >
      The Scientific Officer
    </div>
  );
};

export default Header;
