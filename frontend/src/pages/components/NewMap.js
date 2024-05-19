import {
    APIProvider,
    Map,
    useMap,
    AdvancedMarker,
    Pin,
    InfoWindow,
    useAdvancedMarkerRef
} from "@vis.gl/react-google-maps";
import { useState, useEffect, useRef } from "react"
import axios from "axios"

const NewMap = () => {
    const [restaurants, setRests] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();

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

    const center = { lat: 55.8617, lng: -4.2583 }

    const handleMarkerClick = (restaurant) => {
        setSelectedRestaurant(restaurant)
        setInfoWindowOpen(previousState => !previousState)
    };

    const handleInfoWindowClose = () => {
        setInfoWindowOpen(false);

    };

    return (
        <div className="w-full h-96">
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <Map
                    center={center}
                    zoom={14}
                    disableDefaultUI={true}
                    gestureHandling={'greedy'}
                    mapId={process.env.REACT_APP_GOOGLE_MAPS_API_MAP_ID} >
                    {
                        restaurants.map((restaurant) => {
                            return <div key={restaurant._id}>
                                <AdvancedMarker
                                    ref={markerRef}
                                    position={{lat: restaurant.lat, lng: restaurant.lng}}
                                    onClick={() => handleMarkerClick(restaurant)}
                                    title={restaurant.name}
                                >
                                    <Pin background={'#FFB949'} glyphColor={'#F5F5F5'} borderColor={'#FF9D00'} />

                                </AdvancedMarker>
                                {selectedRestaurant && infoWindowOpen &&(
                                    <InfoWindow
                                        position={center}
                                        disableAutoPan={true}
                                        onCloseClick={handleInfoWindowClose}
                                    >
                                        <div className="w-24 h-12 bg-white">
                                            <h1 className="text-bold">{selectedRestaurant.name}</h1>
                                            <h4>
                                                {selectedRestaurant.keywords.map((keyword, index) => (
                                                        <span key={index}>{keyword}{index !== selectedRestaurant.keywords.length - 1 ? ', ' : ''}</span>
                                                    ))}</h4>
                                        </div>
                                    </InfoWindow>
                                )}
                            </div>
                        })
                    }
                </Map>
            </APIProvider>
        </div>
    );
};

export default NewMap;