import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "./App";
const Form = () => {
    const navigate = useNavigate();
    const authCtx = React.useContext(authContext);
    console.log("isAuth", authCtx.isAuth);
    useEffect(() => {
        axios
            .get("/loggedin")
            .then((res) => {
                console.log(res.data);
                if (res.data.token) {
                    authCtx.setIsAuth(true);
                }
            })
            .catch((err) => {
                navigate("/");
                console.log(err);
            });
    }, []);

    const handleLogOut = () => {
        axios.get("/logout").then((res) => {
            authCtx.setIsAuth(false);
        });
    };

    return (
        <>
            <section style={{ fontSize: "30px", textAlign: "center" }}>
                You are loggedin
            </section>
            <div>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
        </>
    );
};

export default Form;
