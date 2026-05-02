import { Routes, Route } from "react-router";

import Layout from "./layout";
import Home from "./pages/home";
import Practice from "./pages/practice";
import PracticeSession from "./pages/practice/PracticeSession";
// import MockTests from "./pages/mock";
import Books from "./pages/books";
import Articles from "./pages/articles";
import Videos from "./pages/videos";
import About from "./pages/about";

const App = () => {
  return (
    <div className="App bg-neutral-200 clr-neutral-500 bg-pattern">
      <div id="overlay" className="overlay" />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/session" element={<PracticeSession />} />
          {/* <Route path="/practice/mock-test" element={<MockTests />} /> */}
          <Route path="/resources/books" element={<Books />} />
          <Route path="/resources/articles" element={<Articles />} />
          <Route path="/resources/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div className="main">404 Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
