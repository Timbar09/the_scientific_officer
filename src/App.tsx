import { Routes, Route } from "react-router";
import Layout from "./layout";

const App = () => {
  return (
    <div className="App bg-neutral-200 clr-neutral-500">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="/practice" element={<div>Practice Page</div>} />
          {/* <Route path="/mock-test" element={<div>Mock Test Page</div>} /> */}
          <Route path="/resources" element={<div>Resources Page</div>} />
          {/* <Route path="/tips-and-strategies" element={<div></div>} /> */}
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
