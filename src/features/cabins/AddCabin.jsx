import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Cabins from "../../pages/Cabins";
import CabinTable from "./CabinTable";


export default function AddCabin(){
    return (
        <div>
            <Modal>
                <Modal.Open opens="new-cabin">
                    <Button>Add new Cabin</Button>
                </Modal.Open>
                <Modal.Window name="new-cabin">
                    <CreateCabinForm></CreateCabinForm>
                </Modal.Window>
            </Modal>
        </div>
    )
}