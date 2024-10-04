// PublicRoute.tsx
import { RootState } from "@/redux/Store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { token } = useSelector((state: RootState) => state.auth)

    if (token === null) {
        return children;
    } else {
        return <Navigate to={'/dashboard'} />
    }
};

export default PublicRoute;
