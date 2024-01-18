import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";


export default function useUpdateSetting(){
    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
        mutationFn: updateSettingApi,
        onError: (err)=>toast.error(err.message),
        onSuccess: ()=>{
          toast.success("Setting Updated.")
          queryClient.invalidateQueries({
            queryKey: ["settings"],
          })
        },
      });
      
      return {isUpdating, updateSetting}
}