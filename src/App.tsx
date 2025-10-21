import { Routes, Route } from "react-router";

import Layout from "./layout";
import Home from "./pages/home";

const App = () => {
  return (
    <div className="App bg-neutral-200 clr-neutral-500">
      <div id="overlay" className="overlay" />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/practice/questions"
            element={<div className="main">Practice Questions Page</div>}
          />
          <Route
            path="/practice/mock-test"
            element={<div className="main">Mock Test Page</div>}
          />
          <Route
            path="/resources/books"
            element={<div className="main">Books Page</div>}
          />
          <Route
            path="/resources/articles"
            element={<div className="main">Articles Page</div>}
          />
          <Route
            path="/resources/videos"
            element={<div className="main">Videos Page</div>}
          />
          <Route
            path="/about"
            element={<div className="main">About Page</div>}
          />
          <Route path="*" element={<div className="main">404 Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
