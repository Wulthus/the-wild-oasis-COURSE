import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


export default function useDeleteBooking(){

  // const { bookingId } = useParams('bookings');
  const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate: remove}= useMutation({
        mutationFn: (bookingId)=>deleteBooking(bookingId),
        onError: (err)=>toast.error(err.message),
        onSuccess: ()=>{
          toast.success("Booking deleted.")
          queryClient.invalidateQueries({
            queryKey: ["booking"],
          })
        },
      });

    return {isDeleting, remove}
}
