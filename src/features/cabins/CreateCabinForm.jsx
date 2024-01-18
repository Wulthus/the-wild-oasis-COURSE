import styled from "styled-components";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCabin } from "../../services/apiCabins";
import { useCreateCabin } from "./useCreateCabin";
import useEditCabin from "./useEditCabin.js";


function CreateCabinForm({ editedCabin = {}, onClose }) {

  const editSession = Boolean(editedCabin);
  const {id: idEdited, ...editValues} = editedCabin;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editValues : {}
  });
  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();


  const isWorking = isCreating || isEditing;

  function onSubmit(data){
    const picture = typeof data.picture === 'string' ? data.picture : data.picture[0];
    if(editSession) {
      editCabin({newCabinData: {... data, picture}, id: idEdited }, {
        onSuccess: (data)=>{reset(); onClose?.();},
      });
    }
    if(!editSession) {
      createCabin({...data, picture: picture}, {
        onSuccess: (data)=>{reset(); onClose?.();},
      });
    }
  }

  function onError(errors){
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? 'modal' : 'regular'}>
      <FormRow label="Cabin Name" errors={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register("name", {
          required: "Please fill in this field",
        })} />
        {/* {errors?.name?.message && <Error>{errors.name.message}</Error>} */}
      </FormRow>

      <FormRow label="Maximum Capacity" errors={errors?.num_Bedrooms?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("num_Bedrooms", {
          required: "Please fill in this field",
          min: {
            value: 1,
            message: "Cabin capacity should be at least 1",
          },
        })}/>
      </FormRow>

      <FormRow label="Regular price" errors={errors?.base_price?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("base_price", {
          required: "Please fill in this field",
          min: {
            value: 1,
            message: "Cabin capacity should be at least 1",
          },
        })}/>
      </FormRow>

      <FormRow label="Discount" errors={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0}  {...register("discount", {
          required: "Please fill in this field",
          validate: (value)=> value <= getValues().base_price || "Discount should not be larger than the regular price",
        })}/>
      </FormRow>

      <FormRow label="Description for website"  errors={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register("description", {
          required: "Please fill in this field",
        })}/>
      </FormRow>

      <FormRow label="Cabin photo"  errors={errors?.picture?.message}>
        <FileInput id="image" accept="image/*" type="file" disabled={isWorking}  {...register("picture", {
          required: editSession? false : "Please fill in this field",
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{editSession ? "Save Changes" : "Add Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
