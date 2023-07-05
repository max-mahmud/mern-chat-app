import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import FormControl from "../components/FormControl";
import Button from "./../components/Button";
import { useRegister } from "../hooks/useRegister";
import ErrorMessage from "./../components/ErrorMessage";

const Register = () => {
  const [formFields, setFormFeilds] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isLoading, signup, error } = useRegister();

  const handleRegister = async (e) => {
    e.preventDefault();
    await signup(formFields.name, formFields.email, formFields.password);
  };

  return (
    <div className="register flex flex-col justify-center items-center mt-14">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-5 p-4 w-[27rem] bg-slate-50"
      >
        <SectionTitle title={"Register..."} />
        <FormControl
          label="name"
          labelInner="Name"
          inputType="text"
          placeholder="Write your name"
          formFields={formFields}
          setFormFeilds={setFormFeilds}
        />
        <FormControl
          label="email"
          labelInner="Email Address"
          inputType="email"
          placeholder="Write your email"
          formFields={formFields}
          setFormFeilds={setFormFeilds}
        />
        <FormControl
          label="password"
          labelInner="Password"
          inputType="password"
          placeholder="Write your password"
          formFields={formFields}
          setFormFeilds={setFormFeilds}
        />
        <Button text={isLoading ? "Loading..." : "Register"} submit />
        {error && <ErrorMessage error={error} />}
      </form>
    </div>
  );
};

export default Register;
