import styled from "styled-components";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ editedCabin }) {

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onError: (err)=>toast.error(err.message),
    onSuccess: ()=>{
      toast.success("Cabin added.")
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      })
      reset();
    },
  })

  function onSubmit(data){
    mutate({...data, picture: data.picture[0]});
  }

  function onError(errors){
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" errors={errors?.name?.message}>
        <Input type="text" id="name" disabled={isCreating} {...register("name", {
          required: "Please fill in this field",
        })} />
        {/* {errors?.name?.message && <Error>{errors.name.message}</Error>} */}
      </FormRow>

      <FormRow label="Maximum Capacity" errors={errors?.num_Bedrooms?.message}>
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register("num_Bedrooms", {
          required: "Please fill in this field",
          min: {
            value: 1,
            message: "Cabin capacity should be at least 1",
          },
        })}/>
      </FormRow>

      <FormRow label="Regular price" errors={errors?.base_price?.message}>
        <Input type="number" id="regularPrice" disabled={isCreating} {...register("base_price", {
          required: "Please fill in this field",
          min: {
            value: 1,
            message: "Cabin capacity should be at least 1",
          },
        })}/>
      </FormRow>

      <FormRow label="Discount" errors={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isCreating} defaultValue={0}  {...register("discount", {
          required: "Please fill in this field",
          validate: (value)=> value <= getValues().base_price || "Discount should not be larger than the regular price",
        })}/>
      </FormRow>

      <FormRow label="Description for website"  errors={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isCreating} defaultValue="" {...register("description", {
          required: "Please fill in this field",
        })}/>
      </FormRow>

      <FormRow label="Cabin photo"  errors={errors?.picture?.message}>
        <FileInput id="image" accept="image/*" type="file" disabled={isCreating}  {...register("picture", {
          required: "Please fill in this field",
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
