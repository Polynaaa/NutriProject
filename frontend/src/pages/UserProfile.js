import AllRest from "./components/AllRest";
import NavBar from "./components/NavBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";

const UserProfile = () => {
   const navigate = useNavigate();
   const [cookies, , removeCookie] = useCookies([]);
   const [profile, setProfile] = useState(null)

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            if (!cookies.jwt) {
            } else {
               console.log(cookies.jwt)
               const response = await axios.get("http://localhost:4000/profile", {
                  withCredentials: true,
               });
               setProfile(response.data)
            }
         } catch (error) {
            console.error("Error fetching user data:", error);
         }
      };

      fetchUserData();
   }, [cookies.jwt, navigate, removeCookie]);


   return (
      <div className="base">
         <NavBar />

         <div className="relative mx-32">
            {profile && (
               <div className="my-12">
                  <p className="text-4xl font-black">Hi <span className="text-[#8CC498]">{profile.username}</span> !</p>
               </div>
            )}
         </div>

         <div className="w-full px-32 flex h-auto">

            <div className=" w-1/5  border-r border-gray-300">
               <p className="text-lg font-black">My Profile</p>
               <div>
                  <p className="text-md my-4 pb-4 w-3/4 border-b border-gray-300">My Prefernces</p>
                  <p className="text-md my-4 pb-4 w-3/4 border-b border-gray-300">My Favourites</p>
               </div>
            </div>
            <div className="w-full h-auto w-full">
               <div className="px-6">
                  <p>Info: </p>
               </div>
               {profile && (
                  <div className="w-full mt-4 px-6">
                     <p className="text-sm text-bold">Username: <span className="font-normal">{profile.username}</span> </p>
                     <p className="text-sm text-bold">Email: <span className="font-normal">{profile.email}</span></p>
                     <p className="text-sm text-bold">Preferences: <span className="font-normal">{profile.preferences}</span></p>
                  </div>
               )}

               <div className="w-full p-6">
                  <p>Favourites:</p>
                  <div className="mt-6">
                     <AllRest />
                  </div>
               </div>
            </div>
         </div>


         <div className="h-32 w-full">

         </div>


      </div>
   );
};

export default UserProfile;