import { Outlet, useLocation } from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  const location = useLocation();
  const isNotPracticeSessionPage = location.pathname !== "/practice/session";

  return (
    <div className="App bg-neutral-200 clr-neutral-500 bg-pattern">
      <div id="overlay" className="overlay" />
      {isNotPracticeSessionPage && <Header />}

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
