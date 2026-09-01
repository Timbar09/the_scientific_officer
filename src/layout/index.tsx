import { Outlet, useLocation } from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  const location = useLocation();
  const isNotPracticeSessionPage = location.pathname !== "/practice/session";

  return (
    <>
      {isNotPracticeSessionPage && <Header />}

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
