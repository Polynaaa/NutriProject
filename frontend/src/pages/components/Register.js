import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Register = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(["jwt"]);
    useEffect(() => {
        if (cookies.jwt) {
            navigate("/landing");
        }
    }, [cookies, navigate]);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        preferences: '',
    });

    const errorMessage = (error) =>
        toast.error(error, { possition: "bottom-right" })


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setFormData({
                    ...formData,
                    preferences: name,
                });
            } else {
                setFormData({
                    ...formData,
                    preferences: '',
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const { data } = await axios.post("http://localhost:4000/register", {
                ...formData,
            },
                { withCredentials: true }
            );
            if (data) {
                if (data.errors) {
                    const { username, password } = data.errors;
                    if (username) errorMessage(username);
                    else if (password) errorMessage(password);
                } else {
                    navigate("/landing");
                }
            }
        } catch (err) {
            console.log(err);

        }
    };

    return (
        <div className="base w-full h-screen">
            <p className="logo w-full pt-4 text-center">Nutri.</p>
            <div className="base w-full py-16 flex justify-center items-center">
                <div className="border-4 border-[#8CC498] rounded-lg p-8 h-auto bg-white drop-shadow-md">
                    <p className="title">Register</p>

                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="username..."
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg mt-2 py-2 px-3"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email..."
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg mt-2 py-2 px-3"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg mt-2 py-2 px-3"
                                required
                            />
                        </div>
                        <div>
                            <label>Dietary Preferences</label>
                            <div className="mt-2 flex flex-col text-sm">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="vegan"
                                        value="vegan"
                                        checked={formData.preferences.includes('vegan')}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Vegan
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="gluten-free"
                                        value="gluten-free"
                                        checked={formData.preferences.includes('gluten-free')}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Gluten Free
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="vegetarian"
                                        value="vegetarian"
                                        checked={formData.preferences.includes('vegetarian')}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Vegetarian
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="dairy-free"
                                        value="dairy-free"
                                        checked={formData.preferences.includes('dairy-free')}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Dairy free
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="nut-free"
                                        value="nut-free"
                                        checked={formData.preferences.includes('nut-free')}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Nut Free
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="allergen-free"
                                        value="allergen-free"
                                        checked={formData.preferences.includes('allergen-free')}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Allergen-free
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="halal"
                                        value="halal"
                                        checked={formData.preferences.includes('halal')}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Halal
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="carnivore"
                                        value="carnivore"
                                        checked={formData.preferences.includes('carnivore')}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Carnivore
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="pescatarian"
                                        value="pescatarian"
                                        checked={formData.preferences.includes('pescatarian')}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Pescatarian
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-center py-4">
                            <button type="submit" className="bg-black hover:bg-[#FFB949] text-white py-2 px-4 rounded-full">
                                Register
                            </button>

                        </div>
                        <span className="text-xs w-full m-auto text-center"> Already have an account? <Link className="text-[#8CC498]" to="/login">Login here</Link></span>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;