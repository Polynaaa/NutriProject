import PopularSlider from './components/PopularSlider'
import Recommended from './components/Recommended'
import NewMap from './components/NewMap'
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";


const Home = () => {
    const [query, setQuery] = useState("");
    const [restaurants, setRests] = useState([]);
    const [showRestaurants, setShowRestaurants] = useState(3);
    const [showAll, setShowAll] = useState(false);
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/filtered?q=${query}&keywords=${selectedKeywords.join(',')}`);
                setRests(response.data);
            } catch (error) {
                console.error("Error fetching filtered restaurants:", error);
            }
        };
        fetchRestaurants();

    }, [query, selectedKeywords]);

    const handleSeeMore = () => {
        setShowRestaurants(restaurants.length);
        setShowAll(true);
    };
    const handleSeeLess = () => {
        setShowRestaurants(3);
        setShowAll(false);
    };

    //----------------Filter-------------------------------
    const handleChange = (e) => {
        const { value } = e.target;
        setSelectedKeywords(prevSelectedKeywords => {
            if (prevSelectedKeywords.includes(value)) {
                return prevSelectedKeywords.filter(keyword => keyword !== value);
            } else {
                return [...prevSelectedKeywords, value];
            }
        });

    };

    //---------------Search-------------------------------------------------


    const handleSearchChange = (e) => {
        setQuery(e.target.value.toLowerCase())
    }

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedKeywords)

    };

    return (
        <div className="base">
            <NavBar />
            {/* welcome */}
            <div className="relative flex mx-52 h-80 justify-between ">
                <div className="w-2/3 flex flex-col justify-center leading-loose">
                    <p className="font-['Montserrat'] text-lg">Welcome to Nutri.</p>
                    <p className="font-['Montserrat'] text-4xl font-black pt-5">Find your safe place and enjoy your <span className="text-[#FFB949]">gastronomic adventure</span></p>
                </div>
                <img className="h-52 w-auto self-center" src="food-menu.svg" alt="food-menu." />
            </div>

            {/* search bar */}
            <div>
                <form className="flex items-center mx-32 h-24 bg-[#8CC498] rounded-full">
                    <label className="sr-only">Search</label>
                    <div className="px-10 flex justify-between w-full">
                        <input
                            type="text"
                            id="search"
                            value={query}
                            onChange={handleSearchChange}
                            className="h-12 w-full bg-[#F5F5F5] text-gray-900 text-sm rounded-full px-10"
                            placeholder="Search restaurants..."
                            required />
                        <button type="submit" className="ml-3 px-14 text-lg text-white bg-black rounded-full hover:bg-[#F5F5F5] hover:text-black ">Search</button>
                    </div>
                </form>
            </div>

            {/* search & filter */}

            <div className="flex w-full px-32 mt-12 h-auto justify-between">
                <div className="h-auto w-1/4 me-6">

                    <h1 className="title">Filter</h1>
                    <div className="h-96 bg-white rounded-xl">
                        <form onSubmit={handleFilterSubmit}>
                            <div className='p-4'>
                                <label className='text-bold text-[#8CC498]'>Dietary Preferences</label>
                                <div className="mt-2 flex flex-col text-sm space-y-2">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="vegan"
                                            value="vegan"
                                            checked={selectedKeywords.includes('vegan')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Vegan
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="glutenFree"
                                            value="gluten-free"
                                            checked={selectedKeywords.includes('gluten-free')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Gluten Free
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="vegetarian"
                                            value="vegetarian"
                                            checked={selectedKeywords.includes('vegetarian')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Vegetarian
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="dairy-free"
                                            value="dairy-free"
                                            checked={selectedKeywords.includes('dairy-free')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Dairy free
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="nutFree"
                                            value="nut-free"
                                            checked={selectedKeywords.includes('nut-free')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Nut Free
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="allergen-free"
                                            value="allergen-free"
                                            checked={selectedKeywords.includes('allergen-free')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Allergen Free
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="halal"
                                            value="halal"
                                            checked={selectedKeywords.includes('halal')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Halal
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="carnivore"
                                            value="carnivore"
                                            checked={selectedKeywords.includes('carnivore')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Carnivore
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="pescatarian"
                                            value="pescatarian"
                                            checked={selectedKeywords.includes('pescatarian')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Pescatarian
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="h-auto w-full w-3/4">
                    <h1 className="title">All Restaurants</h1>
                    <div className="h-auto">
                        <div className="w-full h-auto">
                            <div className="flex justify-between flex-wrap w-full">
                                {
                                    restaurants.slice(0, showRestaurants).map(restaurant => (

                                        <div className="card w-72 h-96 mb-12 bg-white rounded-xl text-black drop-shadow font-['Montserrat']" >
                                            <img className="h-1/2 w-full overflow-hidden object-cover rounded-t-xl" src={restaurant.photo} alt="Mowgli restaurant" />
                                            <div className='p-4 h-1/2 flex flex-col justify-between'>
                                                <p className="text-lg text-bold" >{restaurant.name}</p>
                                                <p className="text-sm">{restaurant.description}</p>
                                                <p className='text-[#8CC498]'>
                                                    {restaurant.keywords.map((keyword, index) => (
                                                        <span key={index}>{keyword}{index !== restaurant.keywords.length - 1 ? ', ' : ''}</span>
                                                    ))}
                                                </p>
                                                <div className='flex h-6 w-full items-center'>
                                                    <img className="h-6 w-6 text-sm" src="star1.svg"/>
                                                    <p className=" ml-2 text-sm">{restaurant.rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className='w-full h-auto flex justify-center'>
                                {!showAll && (
                                    <button type="button" onClick={handleSeeMore} className="font-['Montserrat'] bg-black hover:bg-[#FFB949] text-white px-10 py-1 rounded-full">See more</button>
                                )}
                                {showAll && (
                                    <button type="button" onClick={handleSeeLess} className="font-['Montserrat'] bg-black hover:bg-[#FFB949] text-white px-10 py-1 rounded-full">See less</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended */}
            <Recommended />

            {/* Popular */}
            <PopularSlider />

            {/* Map */}
            <div className='h-96 w-full px-32'>
                <div className='w-full h-auto bg-blue-200'>
                    <NewMap />
                </div>
            </div>

            {/* footer */}

            <div className="h-32 mt-20 bg-[#8CC498]">

            </div>



        </div>
    );
};

export default Home;