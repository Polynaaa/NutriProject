import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from "react"
import axios from "axios"

const AllRest = () => {

    const [restaurants, setRests] = useState([])
    const [showRestaurants, setShowRestaurants] = useState(3);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        let processing = true
        fetchData(processing)
        return () => {
            processing = false
        }
    }, [])

    const fetchData = async (processing) => {
        await axios.get('http://localhost:4000/restaurants')
            .then(restaurants => {
                if (processing) {
                    setRests(restaurants.data)
                }
            })
            .catch(err => console.log(err))
    }

    const handleSeeMore = () => {
        setShowRestaurants(restaurants.length);
        setShowAll(true);
    };
    const handleSeeLess = () => {
        setShowRestaurants(3);
        setShowAll(false);
    };

    return (
        <div className="w-full h-auto">
            <div className="flex justify-between flex-wrap w-full">
                {
                    restaurants.slice(0, showRestaurants).map(restaurant => (

                        <div className="card w-60 h-96 mb-12 bg-white rounded-xl text-black drop-shadow font-['Montserrat']" >
                            <img className="h-1/2 w-full overflow-hidden rounded-t-xl" src={restaurant.photo} alt="Mowgli restaurant" />
                            <div className='p-4 h-1/2 flex flex-col justify-between'>
                                <p className="text-lg text-bold" >{restaurant.name}</p>
                                <p className="text-sm">{restaurant.description}</p>
                                <p className='text-[#8CC498]'>
                                    {restaurant.keywords.map((keyword, index) => (
                                        <span key={index}>{keyword}{index !== restaurant.keywords.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </p>
                                <div className='flex h-6 w-full items-center'>
                                    <img className="h-6 w-6 text-sm" src="star1.svg" />
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
    );
};

export default AllRest;