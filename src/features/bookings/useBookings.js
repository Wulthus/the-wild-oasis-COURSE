import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RESULTS_PER_PAGE } from "../../utils/globals";


export default function useCabins(){

  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue, method: "eq"};

  const sortByRaw = searchParams.get('sortBy') || "start_date-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {field, direction};

  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));


  const {isLoading, data: { data: bookings, count } = {},}= useQuery({
      queryKey: ['booking', filter, sortBy, currentPage],
      queryFn: ()=>getBookings({filter, sortBy, currentPage}),
    });

  const pageCount = Math.ceil(count / RESULTS_PER_PAGE);

if (currentPage < pageCount){
  queryClient.prefetchQuery({
    queryKey: ['booking', filter, sortBy, currentPage+1],
    queryFn: ()=>getBookings({filter, sortBy, currentPage: currentPage + 1,}),
  });
}

if (currentPage > 1){
  queryClient.prefetchQuery({
    queryKey: ['booking', filter, sortBy, currentPage+1],
    queryFn: ()=>getBookings({filter, sortBy, currentPage: currentPage - 1,}),
  });
}

    return { isLoading, bookings, count }
}
