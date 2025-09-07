import { Routes, Route } from 'react-router'
import Layout from './layout'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="/practice-questions" element={<div>Practice Questions Page</div>} />
          <Route path="/mock-test" element={<div>Mock Test Page</div>} />
          <Route path="/resources" element={<div>Resources Page</div>} />
          <Route path="/tips-and-strategies" element={<div>Tips and Strategies Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
