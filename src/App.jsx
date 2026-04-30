import { Login } from './views/Login/Login'
import { Padre } from './views/padre-view/Padre'

import { Route, Routes, Outlet } from 'react-router-dom'
import './App.css'

function Layout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Login />} />
        <Route path='/padre' element={<Padre />} />
      </Route>
    </Routes>
  )
}

export default App;
