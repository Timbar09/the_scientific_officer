import { Outlet, useLocation } from "react-router";

import Page from "../components/Page";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  const location = useLocation();
  const isNotPracticeSessionPage = location.pathname !== "/practice/session";

  return (
    <div className="App bg-neutral-200 clr-neutral-500 bg-pattern">
      <div id="overlay" className="overlay" />
      {isNotPracticeSessionPage && <Header />}

      <Page>
        <Outlet />
      </Page>

      <Footer />
    </div>
  );
};

export default Layout;
