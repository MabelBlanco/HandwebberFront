import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchLoggedAction,
  useIsLoggedSelector,
} from '../../../store/authSlice';
import { errorUi, useUiErrorSelector } from '../../../store/uiSlice';
import { filesCorrectDataController } from '../../../utils/filesCorrectDataController';
import Button from '../../commons/button/Button';
import '../../commons/card/card.scss';
import { Error } from '../../commons/error/Error';
import CheckBox from '../../commons/forms/checkbox/Checkbox';
import Input from '../../commons/forms/input/Input';
import InputFile from '../../commons/forms/inputFile/InputFile';
import { createUser, loginUser } from '../service';
import styles from './SignUp.module.css';

const initialState = {
  username: '',
  mail: '',
  password: '',
  image: '',
};

const SignUp = ({ className, title, ...props }) => {
  const [credentials, setCredentials] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [check, setCheck] = useState(false);

  const error = useUiErrorSelector();

  const { t } = useTranslation();

  const { isLogged } = useIsLoggedSelector();

  const handleLogin = () => {
    dispatch(fetchLoggedAction());
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCredentials = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleImage = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCheck = () => setCheck(!check);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { image, username, mail, password } = credentials;
    if (password !== confirmPassword) {
      const errorMessage = ["Passwords don't match"];
      dispatch(errorUi(errorMessage));
      throw errorMessage;
    }

    const formData = new FormData();
    formData.append('username', username.toLowerCase());
    formData.append('mail', mail);
    formData.append('password', password);
    if (image) {
      const control = filesCorrectDataController(image, dispatch);
      if (!control) return;
      formData.append('image', image);
    }
    //image && formData.append("image", image);
    try {
      const newUser = await createUser(formData);

      await loginUser({ mail, password });
      //TODO
      //console.log(newUser);
      handleLogin();
      navigate('/advertisements');
      return newUser;
    } catch (error) {
      const errors = [];
      if (Array.isArray(error.message)) {
        error.message.map((e) => errors.push(e.msg));
      } else {
        errors.push(error.message);
      }
      dispatch(errorUi(errors));
    }
  };

  const isEnabledButton = () =>
    credentials.username && credentials.mail && credentials.password && check;

  return (
    <div className='row signup-page'>
      <div className='col-sm-12 text-center title'>
        <h1>Sign up</h1>
      </div>
      <div className='col-sm-12'>
        {error && (
          <Error
            className={styles.signup__error}
            arrayErrors={error}
          />
        )}
        <div className='form-container'>
          {!isLogged && (
            <form
              className='row form-container_form justify-content-center align-items-end'
              onSubmit={handleSubmit}>
              <Input
                type='text'
                name='username'
                label={t('SignUp.username')}
                className='col-md-12 col-lg-6 my-3'
                onChange={handleCredentials}
                value={credentials.username}
              />

              <Input
                type='email'
                name='mail'
                label={t('SignUp.mail')}
                className='col-md-12 col-lg-6 my-3'
                onChange={handleCredentials}
                value={credentials.mail}
              />

              <Input
                type='password'
                name='password'
                label={t('SignUp.password') + ' (min 8 characters)'}
                className='col-md-12 col-lg-6 my-3'
                onChange={handleCredentials}
                value={credentials.password}
              />
              <Input
                type='password'
                name='passwordConfirm'
                label={t('SignUp.confirm password') + ' (min 8 characters)'}
                className='col-md-12 col-lg-6 my-3'
                onChange={handleConfirmPassword}
                value={confirmPassword}
              />

              <InputFile
                name='image'
                id='image'
                label={t('SignUp.Upload picture')}
                className='col-md-12 col-lg-12 my-3'
                onChange={handleImage}
              />

              <CheckBox
                name='check'
                label={t('SignUp.I accept the conditions')}
                className='col-md-12 col-lg-12 my-3 d-flex gap-3'
                onChange={handleCheck}
                checked={check}
              />
              <Button
                type='submit'
                classNameContainer='col-xs-12 d-flex justify-content-end'
                className='btn-secondary'
                disabled={!isEnabledButton()}>
                {t('SignUp.SIGNUP')}
              </Button>
            </form>
          )}
        </div>
        {isLogged && (
          <p className='h5'>
            {t(
              'SignUp.Sorry, you are already registered. If you want register a new count, close this session first'
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
