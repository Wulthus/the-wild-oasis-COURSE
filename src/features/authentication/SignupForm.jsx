import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {

 const { signup, isLoading } = useSignup();
 const { register, formState, getValues, handleSubmit, reset } = useForm();
 const { errors } = formState;

 function onSubmit({fullName, email, password}){
  signup({fullName, email, password}, {
    onSettled: reset,
  });
 }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errors={errors?.fullName?.message}>
        <Input type="text" id="fullName" disabled={isLoading}
        {...register("fullName", 
        { required: "Please fill in this field." })}/>
      </FormRow>

      <FormRow label="Email address" errors={errors?.email?.message}>
        <Input type="email" id="email" disabled={isLoading}{...register("email", { 
          required: "Please fill in this field.", 
          pattern: 
            {
              value: /\S+@\S+\.\S+/, 
              message: "Please provide valid email addres.",
            }, 
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errors={errors?.password?.message}>
        <Input type="password" id="password" disabled={isLoading} {...register("password", { 
          required: "Please fill in this field.", 
          minLength: 
            {
              value: 8, 
              message: "Password needs to be at least 8 characters long.",
            }, 
          })}/>
      </FormRow>

      <FormRow label="Repeat password" errors={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled={isLoading}
        {...register("passwordConfirm", { 
          required: "Please fill in this field.", 
          validate: (value)=> 
            value === getValues().password || "Passwords mismatched."
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary"  disabled={isLoading} type="reset">
          Cancel
        </Button>
        <Button  disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
