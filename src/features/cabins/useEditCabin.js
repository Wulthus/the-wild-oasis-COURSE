import toast from "react-hot-toast";
import { uploadCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function useEditCabin(){
    const queryClient = useQueryClient();
    const { isLoading: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ newCabinData, id })=> uploadCabin(newCabinData, id),
        onError: (err)=>toast.error(err.message),
        onSuccess: ()=>{
          toast.success("Changes saved.")
          queryClient.invalidateQueries({
            queryKey: ["cabin"],
          })
        },
      });
      
      return {isEditing, editCabin}
}
