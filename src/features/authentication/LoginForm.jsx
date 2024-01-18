import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
// import { login } from "../../services/apiAuthentication";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isLoggingIn, logIn} = useLogin();

  function handleSubmit(e) {
    e.preventDefault()
    if(!email || !password) return
    logIn({ email, password }, {
      onSettled: ()=>{
        setEmail("");
        setPassword("");
      },
    })
  }

  return (
    <Form onSubmit={(e)=>handleSubmit(e)}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoggingIn}>{!isLoggingIn ? "Log in" : <SpinnerMini></SpinnerMini>}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
