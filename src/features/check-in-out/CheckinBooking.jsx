import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();
  const { booking, isLoading } = useBooking();
  const { isLoading: isLoadingSettings, settings } = useSettings();


  const {
    id: bookingId,
    guests,
    price_total,
    num_guests,
    with_breakfast,
    num_nights,
  } = booking;

  const optionalBreakfastPrice = settings?.BREAKFAST_PRICE * num_guests * num_nights;

  useEffect(function(){
    setConfirmedPaid(booking?.paid ?? false)
  }, [booking])

  function handleCheckin() {
    if(!confirmedPaid) return;
    if(addBreakfast){
      checkIn({bookingId, breakfast: {
        with_breakfast: true,
        price_extras: optionalBreakfastPrice,
        price_total: optionalBreakfastPrice + price_total,
      }})
    }else{
      checkIn({bookingId, breakfast: {}})
    }

  }

  if (isLoading || isLoadingSettings) return <Spinner></Spinner>

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!with_breakfast && (<Box>
        <Checkbox checked={addBreakfast} onChange={()=>{
          setAddBreakfast((add)=>!add);
          setConfirmedPaid(false);
        }}
        id="breakfast">
          Want to add breakfast for {optionalBreakfastPrice}$?
        </Checkbox>
      </Box>)
      }

      <Box>
        <Checkbox checked={confirmedPaid} disabled={confirmedPaid || isCheckingIn} id={bookingId} onChange={()=>setConfirmedPaid((confirmed)=>!confirmed)}>Confirm that <b>{guests.full_name}</b> has paid total ammount of {!addBreakfast ? formatCurrency(price_total) : formatCurrency(price_total+optionalBreakfastPrice)}.</Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmedPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
