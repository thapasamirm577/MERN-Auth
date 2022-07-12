import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./login";
import Form from "./form";
import Register from "./cookie";
import { createContext, useState } from "react";
import ProctedRoute from "./protected";
import Coutnryrestapi from "./coutnryrestapi";
import Share from "./shareSocial";

export const authContext = createContext({
    isAuth: false,
    setIsAuth: () => {},
});

function App() {
    axios.defaults.baseURL = "http://localhost:5000/";
    axios.defaults.withCredentials = true;

    const [isAuth, setIsAuth] = useState(false);

    console.log("isAutt", isAuth);
    return (
        <authContext.Provider value={{ isAuth, setIsAuth }}>
            <BrowserRouter>
                <Routes>
                    {!isAuth && <Route path="/" element={<Register />} />}
                    {!isAuth && <Route path="/login" element={<Login />} />}
                    <Route
                        path="/form"
                        element={
                            <ProctedRoute isAuth={isAuth}>
                                <Form />
                            </ProctedRoute>
                        }
                    />
                    <Route path="/country" element={<Coutnryrestapi />} />
                    <Route path="/share" element={<Share />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </BrowserRouter>
        </authContext.Provider>
    );
}

export default App;
