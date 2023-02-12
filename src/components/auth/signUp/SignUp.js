import { useState } from 'react';
import FormField from '../../common/formField/FormField';
import Button from '../../common/button/Button';
import CheckBox from '../../common/checkBox/CheckBox';
import styles from './SignUp.module.css';
import { createUser } from '../service';

const initialState = {
  username: '',
  mail: '',
  password: '',
  photo: ''
};

const SignUp = () => {
  const [credentials, setCredentials] = useState(initialState);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(null);

  const resetError = () => setError(null);

  const handleCredentials = (event) =>{
    resetError();
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
    

  const handleCheck = () => setCheck(!check);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const newUser = await createUser(credentials);
      console.log(newUser)
      return newUser;
    } catch (error) {
      setError(error);
      console.log(error)
    }
  };

  const isEnabledButton = () =>
    credentials.username && credentials.mail && credentials.password && check;

  return (
    <div className={styles.signup__page}>
      <h1 className={styles.signup__title}>{`WELCOME TO HANDWEBER`}</h1>
      {error && <h1>{error.message}</h1>}
      <form className={styles.signup__form} onSubmit={handleSubmit}>
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
          name='mail'
          label='mail'
          className={styles.signup__field}
          onChange={handleCredentials}
          value={credentials.mail}
        />

        <FormField
          type='password'
          name='password'
          label='password'
          className={styles.signup__field}
          onChange={handleCredentials}
          value={credentials.password}
        />

        <label htmlFor='photo' style={{ color: 'whitesmoke' }}>
          Upload picture
        </label>
        <p className={styles.recomendation__size}>
          *Recomended size 300px / 300px
        </p>
        <input
          onChange={handleCredentials}
          type='file'
          name='image'
          id='image'
          photo={''}
          style={{ color: 'whitesmoke' }}
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
