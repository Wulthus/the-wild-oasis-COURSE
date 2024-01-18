
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

import styled from "styled-components";
import Spinner from "../ui/Spinner";


const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function ProtectedRoute({ children }){
    const navigate = useNavigate();

    const { isLoading, user, isAuthenticated } = useUser();

    useEffect(function(){
        if(!isAuthenticated && !isLoading){
            navigate("/login")
        }
    }, [isAuthenticated, navigate, isLoading])

    if(isLoading) return <FullPage><Spinner></Spinner></FullPage>

    if(isAuthenticated) return children
}