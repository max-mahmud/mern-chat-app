import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import FormControl from "../components/FormControl";
import Button from "./../components/Button";

const Login = () => {
  const [formFields, setFormFeilds] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(formFields);
    setFormFeilds({
      email: "",
      password: "",
    });
  };
  return (
    <div className="register flex flex-col justify-center items-center mt-14">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-5 p-4 w-[27rem] bg-slate-50"
      >
        <SectionTitle title={"Login..."} />
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
        <Button text={"Login"} submit />
      </form>
    </div>
  );
};

export default Login;
