import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deletionFunction } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin(){
    
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (id)=>deletionFunction(id),
        onError: (err)=>toast.error(err.message),
        onSuccess: ()=>{
          toast.success("Cabin deleted.")
          queryClient.invalidateQueries({
            queryKey: ["cabin"],
          })
        },
    
      });

      return {isDeleting, deleteCabin};
}