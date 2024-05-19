import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Login = () => {
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.jwt) {
            navigate("/landing");
        }
    }, [cookies, navigate]);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const errorMessage = (error) =>
        toast.error(error, { possition: "bottom-right" })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const { data } = await axios.post("http://localhost:4000/login", {
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
                    <p className="title">Login</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="flex justify-center py-4">
                            <button type="submit" className="bg-black hover:bg-[#FFB949] text-white py-2 px-4 rounded-full">
                                Login
                            </button>

                        </div>
                        <span className="text-xs w-full m-auto text-center"> Dont have an account? <Link className="text-[#8CC498]" to="/register">Register here.</Link></span>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;