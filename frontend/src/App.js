import { Routes, Route } from 'react-router-dom';
import MainLand from './pages/MainLand';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import UserProfile from './pages/UserProfile';
import NoPage from './pages/NoPage';
import NavBar from './pages/components/NavBar';
import Login from './pages/components/Login';
import Register from './pages/components/Register';
import UserLand from './pages/UserLand'
import './App.css';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLand />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/landing" element={<UserLand />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default App;
