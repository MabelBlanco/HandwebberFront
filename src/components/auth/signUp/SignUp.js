import { useState } from 'react';
import FormField from '../../common/formField/FormField';
import Button from '../../common/button/Button';
import CheckBox from '../../common/checkBox/CheckBox';
import styles from './SignUp.module.css';

const initialState = {
  username: '',
  email: '',
  password: '',
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
    }catch(error){

    };
  };

  const isEnabledButton = () => credentials.username && credentials.email && credentials.password && check;
    
  return (
    <div className={styles.signup__page}>
      <h1 className={styles.signup__title}>{`WELCOME TO HANDELWEBER`}</h1>
      <form className={styles.signup__form}
            onSubmit={handleSubmit}
      >
        <FormField
          type='text'
          name='username'
          label='username'
          className={styles.signup__field}
          onChange={handleCredentials}
          value={credentials.username}
        />

        <FormField
          type='email'
          name='email'
          label='email'
          className={styles.signup__field}
          onChange={handleCredentials}
          value={credentials.email}
        />

        <FormField
          type='password'
          name='password'
          label='password'
          className={styles.signup__field}
          onChange={handleCredentials}
          value={credentials.password}
        />

        <CheckBox
          type='checkbox'
          name='check'
          label='Acepto las condiciones'
          onChange={handleCheck}
          checked={check}
        />
        <Button
          type='submit'
          className={styles.signup__submit}
          disabled={!isEnabledButton()}
        >
          SIGNUP
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
