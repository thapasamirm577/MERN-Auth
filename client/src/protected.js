import React, { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProctedRoute = ({ isAuth, redirect = "/", children }) => {
    if (!isAuth) {
        return <Navigate to={redirect} replace />;
    }
    return children ? children : <Outlet />;
};

export default ProctedRoute;
