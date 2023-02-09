import { useState } from "react";
import Button from "../../commons/button/Button";
import CheckBox from "../../commons/forms/checkBox/CheckBox";
import Input from "../../commons/forms/input/Input";
import styles from "./SignUp.module.css";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [credentials, setCredentials] = useState(initialState);
  const [check, setCheck] = useState(false);

  const handleCredentials = (event) =>
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

  const handleCheck = () => setCheck(!check);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(credentials);
    } catch (error) {}
  };

  const isEnabledButton = () =>
    credentials.username && credentials.email && credentials.password && check;

  return (
    <div className="">
      <h1 className="">{`WELCOME TO HANDELWEBER`}</h1>
      <form className="" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          label="username"
          className={styles.signup__field}
          onChange={handleCredentials}
          value={credentials.username}
        />

        <Input
          type="email"
          name="email"
          label="email"
          className=""
          onChange={handleCredentials}
          value={credentials.email}
        />

        <Input
          type="password"
          name="password"
          label="password"
          className=""
          onChange={handleCredentials}
          value={credentials.password}
        />

        <CheckBox
          type="checkbox"
          name="check"
          label="Acepto las condiciones"
          onChange={handleCheck}
          checked={check}
        />
        <Button type="submit" className="" disabled={!isEnabledButton()}>
          SIGNUP
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
