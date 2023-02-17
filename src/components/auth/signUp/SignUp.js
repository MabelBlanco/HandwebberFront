import { useState } from 'react';
import Input from '../../commons/forms/input/Input';
import InputFile from '../../commons/forms/inputFile/InputFile';
import Button from '../../commons/button/Button';
import CheckBox from '../../commons/forms/checkbox/Checkbox';
import styles from './SignUp.module.css';
import { createUser } from '../service';
import { useNavigate } from 'react-router-dom';

const initialState = {
  username: '',
  mail: '',
  password: '',
  photo: '',
};

const SignUp = () => {
  const [credentials, setCredentials] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState('')
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const resetError = () => setError(null);

  const handleCredentials = (event) => {
    resetError();
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleConfirmPassword = (event)  => {
    resetError();
    setConfirmPassword(event.target.value);
  };

  const handleCheck = () => setCheck(!check);

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetError();
    if(credentials.password !== confirmPassword){
      setError(["Passwords don't match"]);
      return;
    }
    try {
      const newUser = await createUser(credentials);
      navigate('/advertisements');
      console.log(newUser);
      return newUser;
    } catch (error) {
      const errors = [];
      if (Array.isArray(error.message)) {
        error.message.map((e) => errors.push(e.msg));
      } else {
        errors.push(error.message);
      }
      setError(errors);
    }
  };

  const isEnabledButton = () =>
    credentials.username && credentials.mail && credentials.password && check;

  return (
    <div className={styles.signup__page}>
      {error && error.map((e) => <p className={styles.signup__error} key={e}> {e} </p>)}
      <form className={styles.signup__form} onSubmit={handleSubmit}>
        <Input
          type='text'
          name='username'
          label='username'
          className={styles.signup__field}
          onChange={handleCredentials}
          value={credentials.username}
        />

        <Input
          type='email'
          name='mail'
          label='mail'
          className={styles.signup__field}
          onChange={handleCredentials}
          value={credentials.mail}
        />

        <Input
          type='password'
          name='password'
          label='password (min 8 characters)'
          className={styles.signup__field}
          onChange={handleCredentials}
          value={credentials.password}
        />

        <Input
          type='password'
          name='passwordConfirm'
          label='confirm password'
          className={styles.signup__field}
          onChange={handleConfirmPassword}
          value={confirmPassword}
        />

        <InputFile
        name='image'
        id='image'
        photo={''}
        label={'Upload picture'}
        className={styles.signup__field}
        onChange={handleCredentials}
         />

        <CheckBox
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
