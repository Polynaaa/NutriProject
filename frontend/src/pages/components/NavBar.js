import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/");
  };

 return (
    <nav className="sticky top-0 z-50 w-full bg-[#F5F5F5] flex justify-between h-14">
        <div className="pl-52 flex w-full py-3 font-['Montserrat'] text-lg justify-between">
          <NavLink to="/home" className='w-28'>home</NavLink>
          <NavLink to="/" className='w-28 text-center'>about us</NavLink>
          <Link to="/landing" className="logo w-28 text-center">Nutri.</Link>
          <NavLink to="/" className='w-28 text-center'>blog</NavLink>
          <NavLink to="/profile" className='w-28 text-right'>profile</NavLink>
        </div>
        <div className='w-[288px] flex justify-end items-center h-full px-4'><button onClick={logOut} className="border border-black hover:border-[#8CC498] rounded-full py-1 px-2">Logout</button></div>
    </nav>
);
};

export default NavBar;