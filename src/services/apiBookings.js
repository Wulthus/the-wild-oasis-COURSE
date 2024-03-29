import { RESULTS_PER_PAGE } from "../utils/globals";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, currentPage }){
  let query = supabase
  .from('Bookings')
  .select("id, start_date, end_date, num_nights, num_guests, status, price_total, Cabins(name), guests(full_name, email)",
  { count: "exact" })

  if (filter){
    query = query[filter.method || 'eq'](filter.field, filter.value);
  }

  if (sortBy) {
    query.order(sortBy.field, {ascending: (sortBy.direction === "asc"),})
  }

  if (currentPage){
    const from = (currentPage - 1) * RESULTS_PER_PAGE;
    const to = from + RESULTS_PER_PAGE - 1;

    query = query.range(from, to)
  }

  const { data, error, count } = await query

  if(error){
    console.log(error);
    throw new Error(`API failed to retrieve bookings from database: "${error.message}"`);
  }
  return { data, count }
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  console.log("I ran")
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, price_total, price_extras")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, guests(full_name, nationality, nationality_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
