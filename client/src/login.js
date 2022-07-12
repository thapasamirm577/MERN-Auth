import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "./App";

const Login = () => {
    const authCtx = React.useContext(authContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [csrfToken, setCsrfToken] = useState("");
    const handleUser = (e) => {
        const tempUser = { ...user, [e.target.name]: e.target.value };
        setUser({ ...tempUser });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
        axios
            .post("/login", user, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(async (res) => {
                console.log(res);
                //Cookies.set("token", res.data.token);
                if (res.statusText === "OK") {
                    authCtx.setIsAuth(true);
                    if (window !== undefined) {
                        localStorage.setItem(
                            "userTestInfo",
                            JSON.stringify(res.data.data)
                        );
                    }
                    //await getToken();
                    navigate("/form");
                }
            });
    };

    const getToken = async () => {
        axios.get("/loggedin", { withCredentials: true }).then((res) => {
            console.log(res.data);
        });
    };
    // useEffect(() => {
    //     axios.get("/loggedin").then((res) => {
    //         console.log(res.data);
    //     });
    // }, []);

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
                navigate("/login");
                console.log(err);
            });
    }, []);
    console.log("isAuth", authCtx.isAuth);
    return (
        <>
            <form onSubmit={handleSubmit}>
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

export default Login;
