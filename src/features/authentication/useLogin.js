import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){

    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const {isLoading: isLoggingIn, mutate: logIn} = useMutation({
        mutationFn: ({email, password})=>login({email, password}),
        onSuccess: (data)=>
        {
            queryClient.setQueryData(['user'], data.user);
            navigate("/dashboard");
        },
        onError: (error)=>
        {
            console.log(error);
            toast.error("Invalid login credentials");
        },


    })

    return {isLoggingIn, logIn}
}