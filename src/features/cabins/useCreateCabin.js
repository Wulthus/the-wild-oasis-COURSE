import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCabin } from "../../services/apiCabins";

import toast from "react-hot-toast";


export function useCreateCabin(){
    
    const queryClient = useQueryClient();
    
    const { isLoading: isCreating, mutate: createCabin } = useMutation({
        mutationFn: uploadCabin,
        onError: (err)=>toast.error(err.message),
        onSuccess: ()=>{
          toast.success("Cabin added.")
          queryClient.invalidateQueries({
            queryKey: ["cabin"],
          })
        },
      });

  return {isCreating, createCabin}
}
