import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './loginPage.css';
import { loginUser } from '../service';
import Input from '../../commons/forms/input/Input';
import Button from '../../commons/button/Button';
import { useTranslation } from 'react-i18next';
import { Error } from '../../commons/error/Error';
import {
  fetchLoggedAction,
  useIsLoggedSelector,
} from '../../../store/authSlice';
import { useDispatch } from 'react-redux';

export function LoginPage() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLogged } = useIsLoggedSelector();
  const handleLogin = () => {
    dispatch(fetchLoggedAction());
  };

  const { t } = useTranslation();

   const loginMessageError = t(
     'LoginPage.Sorry, you are loggin now. If you want singin with another count, close this session first.'
   );
  /* const loginMessageError =
    'Sorry, you are loggin now. If you want singin with another count, close this session first.';
 */
  const submitEvent = async (event) => {
    event.preventDefault();

    try {
      await loginUser({
        mail: emailValue,
        password: passwordValue,
      });

      handleLogin();
      const to = location.state?.from?.pathname || '/';
      navigate(to);
    } catch (error) {
      const errors = [];
      if (Array.isArray(error.message)) {
        error.message.map((e) => errors.push(e.msg));
      } else {
        errors.push(error.message);
      }
      setErrors(errors);
    }
  };

  if (isLogged) {
    return <p>{loginMessageError}</p>;
  } else {
    return (
      <form
        id='login'
        onSubmit={submitEvent}
      >
        <div className='emailContainer'>
          <Input
            value={emailValue}
            type='text'
            label={t('LoginPage.Email') + ':'}
            name='loginEmail'
            id='loginEmail'
            onChange={(event) => setEmailValue(event.target.value)}
          />
        </div>
        <div className='passwordContainer'>
          <Input
            value={passwordValue}
            type='password'
            label={t('LoginPage.Password') + ':'}
            name='loginPassword'
            id='loginPassword'
            onChange={(event) => setPasswordValue(event.target.value)}
          />
        </div>
        <Button
          type='submit'
          form='login'
          className='loginButton'
        >
          {t('LoginPage.Login')}
        </Button>
        <Error arrayErrors={errors} />
      </form>
    );
  }
}
