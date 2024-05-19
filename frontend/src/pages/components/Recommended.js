import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Recommended = () => {

    const [cookies, , removeCookie] = useCookies([]);
    const [recRests, setRecRests] = useState([])

    useEffect(() => {
        const fetchRecommendedData = async () => {
            try {
                if (!cookies.jwt) {
                } else {
                    console.log(cookies.jwt)
                    const response = await axios.get("http://localhost:4000/recommendations", {
                        withCredentials: true,
                    });
                    if (typeof response.data === 'object' && response.data.recommendations) {
                        const recommendationsArray = JSON.parse(response.data.recommendations);
                        setRecRests(recommendationsArray);
                        console.log(recommendationsArray);
                    } else {
                        console.error("Response data is not an array:", response.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchRecommendedData();
    }, [cookies.jwt, removeCookie]);

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
        <div className="w-full my-20 h-auto bg-[#FFB949] py-20">
            <p className="px-32 mb-6 font-['Montserrat'] text-3xl font-bold text-[#F5F5F5]">Recommended for you</p>
            <div className="slider-conteiner w-5/6 m-auto">
                <Slider {...settings}>
                    {
                        recRests.map(recRest => (

                            <div className="card w-1/5 h-96 bg-white rounded-xl text-black drop-shadow font-['Montserrat']" >
                                <img className="h-1/2 w-full overflow-hidden object-cover rounded-t-xl" src={recRest.photo} alt="Mowgli restaurant" />
                                <div className='p-4 h-1/2 flex flex-col justify-between'>
                                    <p className="text-lg text-bold" >{recRest.name}</p>
                                    <p className="text-sm">{recRest.description}</p>
                                    <p className='text-[#8CC498]' >{recRest.keywords.map((keyword, index) => (
                                        <span key={index}>{keyword}{index !== recRest.keywords.length - 1 ? ', ' : ''}</span>
                                    ))} </p>
                                    <div className='flex h-6 w-full items-center'>
                                        <img className="h-6 w-6 text-sm" src="star1.svg" />
                                        <p className=" ml-2 text-sm">{recRest.rating}</p>
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

export default Recommended;