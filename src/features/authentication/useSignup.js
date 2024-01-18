import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI} from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export default function useSignup(){
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupAPI,
        onSuccess: (newUser)=>{
            toast.success("New user created. Check your email for confirmation link.")
        },
    })

    return {signup, isLoading}
}