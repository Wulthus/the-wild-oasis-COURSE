import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

  const { isLoading, booking } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { isDeleting, remove } = useDeleteBooking();


  const moveBack = useMoveBack();
  const navigate = useNavigate();


  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner></Spinner>;
  if (!booking) return <Empty resource="booking"></Empty>

  const { status, id: bookingId } = booking;

  function handleDelete(){
    remove(bookingId)
    moveBack()
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          <Modal.Open opens="delete">
            <Button variation="danger">
              Delete
            </Button>
          </Modal.Open>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          {status === 'unconfirmed' && <Button icon={<HiArrowDownOnSquare />} onClick={()=>navigate(`/checkin/${bookingId}`)}>
                  Check In
          </Button>
          }
          {status === 'checked-in' && <Button icon={<HiArrowUpOnSquare />} onClick={()=>checkOut(bookingId)}>
                  Check Out
          </Button>
          }
          </ButtonGroup>
          <Modal.Window name="delete">
              <ConfirmDelete resourceName="booking" disabled={isDeleting} onConfirm={handleDelete}></ConfirmDelete>
        </Modal.Window>
        </Modal>
    </>
  );
}

export default BookingDetail;
