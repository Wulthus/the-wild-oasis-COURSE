import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuthentication";


export default function useUpdateUser(){
    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: updateUser } = useMutation({
        mutationFn: updateCurrentUser,
        onError: (err)=>toast.error(err.message),
        onSuccess: ()=>{
          toast.success("Account updated succesfully.")
          queryClient.invalidateQueries({
            queryKey: ["user"],
          })
        },
      });
      
      return {isUpdating, updateUser}
}