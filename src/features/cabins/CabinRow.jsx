import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }){
  
  const {id: cabinId, name, num_Bedrooms, base_price, discount, description, picture} = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate(){
    createCabin({
      name: `Copy of ${name}`,
      num_Bedrooms, 
      base_price, 
      discount, 
      description, 
      picture
    })
  };

  return (    
      <Table.Row role="row">
        <Img src={picture} />
        <Cabin>{name}</Cabin>
        <div>{num_Bedrooms}</div>
        <Price>{base_price}</Price>
        <Discount>{discount ? discount : "None"}</Discount>
        <div>
          <Modal>
              <Menus.Menu>
                <Menus.Toggle id={cabinId}/>
                <Menus.List id={cabinId}>
                  <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                    Clone
                  </Menus.Button>
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}>
                      Edit
                    </Menus.Button>
                  </Modal.Open>
                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>
                      Delete
                    </Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>


            <Modal.Window name="edit">
              <CreateCabinForm editedCabin={cabin}></CreateCabinForm>
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete resourceName="cabins" disabled={isDeleting || isCreating} onConfirm={()=>deleteCabin(cabinId)}></ConfirmDelete>
            </Modal.Window>
          </Modal>

        </div>
      </Table.Row>

  )
  
}
