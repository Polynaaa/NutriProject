import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const PopularSlider = () => {

    const [restaurants, setRests] = useState([])

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

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} >
                <img class="arrows" alt="Previous" src="Prev.svg" />
            </div>
        )
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} >
                <img class="arrows" alt="Previous" src="Next.svg" />
            </div>
        )
    }


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="w-full my-20 h-auto">
            <p className="px-32 mb-6 font-['Montserrat'] text-3xl font-bold">Popular now</p>
            <div className="slider-conteiner w-5/6 m-auto">
                <Slider {...settings}>
                    {
                        restaurants.map(restaurant => (

                            <div className="card w-1/5 h-96 bg-white rounded-xl text-black drop-shadow font-['Montserrat']" >
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
                                        <img className="h-6 w-6 text-sm" src="star1.svg" />
                                        <p className=" ml-2 text-sm">{restaurant.rating}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
};

export default PopularSlider;