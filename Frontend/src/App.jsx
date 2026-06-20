import { Login } from './views/Login/Login';
import { Padre } from './views/padre-view/Padre';
import { Admin } from './views/administatrivo-view/Admin';
import { Docente } from './views/docente-view/Docente';

import { Route, Routes, Outlet } from 'react-router-dom';
import './App.css';

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
        <Route path='/administrativo' element={<Admin />} />
        <Route path='/docente' element={<Docente />} />
      </Route>
    </Routes>
  )
}

export default App;
