import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";

type Props = {
    children: ReactNode
}


export const AuthMiddleware = ({children}:Props) => {
    const navigate = useNavigate();
    
    const { islogged } = useAuth();

    useEffect (() => {
        if(!islogged) navigate('/signin')
    }, [])

    return (
        <>
            {children}
        </>
    );
}