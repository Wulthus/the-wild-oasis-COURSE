import { formatCurrency } from "../../utils/helpers";
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";

export default function Stats({ bookings, confirmedStays, numDays, cabinCount }){

    const numBookings = bookings.length
    const sales = bookings.reduce((totalPrice, booking) => totalPrice + booking.price_total, 0);
    const checkIns = confirmedStays.length
    const occupation = confirmedStays.reduce((totalNights, booking)=>totalNights + booking.num_nights, 0) / (numDays * cabinCount)

    return (
        <>
            <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings}></Stat>
            <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)}></Stat>
            <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkIns}></Stat>
            <Stat title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar />} value={Math.round(occupation*100) + "%"}></Stat>
        </>
    )
    
}