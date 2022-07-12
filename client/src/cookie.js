import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const authCtx = React.useContext(authContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        age: "",
        email: "",
        password: "",
    });

    const handleUser = (e) => {
        const tempUser = { ...user, [e.target.name]: e.target.value };
        setUser({ ...tempUser });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            const res = await axios.post("/user/create", user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //console.log(res);
            if (res.ok) {
                alert("Success");
            }
        };
        fetchApi();
    };

    useEffect(() => {
        axios
            .get("/loggedin")
            .then((res) => {
                console.log(res.data);
                if (res.data.token) {
                    authCtx.setIsAuth(true);
                    navigate("/form");
                }
            })
            .catch((err) => {
                authCtx.setIsAuth(false);
                navigate("/");
                console.log(err);
            });
    }, []);
    console.log("isAuth", authCtx.isAuth);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type={"text"}
                    name="name"
                    id="name"
                    placeholder="enter your name"
                    value={user.name}
                    onChange={handleUser}
                />
                <br />
                <input
                    type={"email"}
                    name="email"
                    id="email"
                    placeholder="enter your email"
                    value={user.email}
                    onChange={handleUser}
                />
                <br />
                <input
                    type={"number"}
                    name="age"
                    id="age"
                    placeholder="enter your age"
                    value={user.age}
                    onChange={handleUser}
                />
                <br />
                <input
                    type={"password"}
                    name="password"
                    id="password"
                    placeholder="enter your password"
                    value={user.password}
                    onChange={handleUser}
                />
                <br />
                <button style={{ padding: "20px 12px" }}>Sbbmit</button>
            </form>
        </>
    );
};

export default Register;
