import PopularSlider from './components/PopularSlider';
import { Link, NavLink } from 'react-router-dom';


const MainLand = () => {

  return (
    <div className="base">

      <nav className="sticky top-0 z-50 w-full bg-[#F5F5F5]">
        <div className="flex mx-32 py-3 font-['Montserrat'] text-lg justify-between">
          <NavLink to="/register" className='w-28'>home</NavLink>
          <NavLink to="/register" className='w-28 text-center'>about us</NavLink>
          <Link to="/" className="logo w-28 text-center">Nutri.</Link>
          <NavLink to="/register" className='w-28 text-center'>blog</NavLink>
          <div>
            <NavLink to="/register" className='w-28 text-right'><button className="bg-black hover:bg-[#8CC498] text-white rounded-full py-1 px-2 mx-2">Register</button></NavLink>
            <NavLink to="/login" className='w-28 text-right'><button className="bg-black hover:bg-[#8CC498] text-white rounded-full py-1 px-2">Login</button></NavLink>
          </div>
        </div>
      </nav>

      {/* banner */}

      <div className="relative flex mx-52 h-80 justify-between content-center">
        <div className="w-2/3 flex flex-col justify-center leading-loose">
          <p className="font-['Montserrat'] text-lg">Welcome to Nutri.</p>
          <p className="font-['Montserrat'] text-4xl font-black pt-5">Find your safe place and enjoy your <span className="text-[#8CC498]">gastronomic adventure</span></p>
        </div>
        <img className="h-52 w-auto self-center" src="food-menu.svg" alt="food-menu." />
      </div>
      <div className="flex justify-center mb-10">
        <Link to="/register"><button className="font-['Montserrat'] bg-black hover:bg-[#FFB949] text-white px-10 py-1 rounded-full">Search now</button></Link>
      </div>

      {/* small banners */}

      <div className="h-72 w-full bg-[#FFB949] flex px-32">
        <div className="w-1/2 flex justify-between">
          <img className="h-72 w-auto object-cover" src="food.jpg" alt="table with food" />
          <img className="h-20 place-self-center px-6 w-1/6" src="arrows.svg" />
        </div>
        <p className="w-1/2 font-['Montserrat'] font-black text-[#F5F5F5] text-3xl place-self-center text-center">Hundreds of restaurants, cafes and food courts</p>
      </div>

      <div className=" flex mx-72 h-72 justify-between content-center">
        <div className="w-2/3 flex flex-col justify-center leading-loose">
          <p className="font-['Montserrat'] text-4xl font-black">Thousands of happy customers all over UK</p>
        </div>
        <img className="h-52 w-auto self-center" src="happy-customers.svg" alt="food-menu." />
      </div>

      <div className="h-72 w-full bg-[#8CC498] flex px-32">
        <p className="w-1/2 font-['Montserrat'] font-black text-[#F5F5F5] text-3xl place-self-center text-center">Wide range of menus from vegan to gluten-free</p>
        <div className="w-1/2 flex justify-between">
          <img className="h-20 w-1/6 place-self-center px-6" src="arrows.svg" />
          <img className="h-72 w-auto object-cover" src="food2.jpg" alt="table with food" />
        </div>
      </div>

      {/* popular */}
      <PopularSlider />

      {/* footer */}

      <div className="h-32 bg-[#8CC498]">

      </div>


    </div>
  );
}

export default MainLand;