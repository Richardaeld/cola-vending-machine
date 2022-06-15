import {Routes, Route} from 'react-router-dom';

import RequireAuth from './components/html/elements/RequireAuth';
import Home from './components/html/structure/Home'
import Layout from './components/html/structure/Layout';
import Login from './components/html/structure/Login';
import Register from './components/html/structure/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* protected */}
          <Route element={<RequireAuth />}>
            <Route path="register1" element={<Register />} />
          </Route>

          {/* Index */}
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
