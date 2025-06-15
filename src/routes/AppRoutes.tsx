import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import { Navbar } from '../components/Navbar';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/navbar' element={<Navbar />} />
    </Routes>
  );
};

export default AppRoutes;