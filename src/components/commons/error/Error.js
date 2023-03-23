import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../button/Button';
import './error.scss';
import { resetErrorUi } from '../../../store/uiSlice';
import { useDispatch } from 'react-redux';

export function Error({ arrayErrors, ...props }) {
  const [errors, setErrors] = useState(arrayErrors);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const resetError = () => setErrors([]);

  const resetUiError = () => {
    dispatch(resetErrorUi());
    resetError();
  };

  useEffect(() => {
    setErrors(arrayErrors);
  }, [arrayErrors]);

  if (!errors.length) {
    return '';
  } else {
    return (
      <div>
        {errors.map((error) => {
          //console.log(error)
          let errorTranslate;
          if (error[0] === 'Username must be alphanumeric') {
            errorTranslate = t('Error.Username must be alphanumeric');
          } else if (error[0] === 'Insert a valid mail please') {
            errorTranslate = t('Error.Insert a valid mail please');
          } else if (error[0] === 'Password min length 8 characters') {
            errorTranslate = t('Error.Password min length 8 characters');
          } else if (error[0] === 'ERROR in DB') {
            errorTranslate = t('Error.ERROR in DB');
          } else if (error[0] === 'User not found') {
            errorTranslate = t('Error.User not found');
          } else if (error[0] === 'Bad Request') {
            errorTranslate = t('Error.Bad Request');
          } else if (error[0] === 'User not in DB') {
            errorTranslate = t('Error.User not in DB');
          } else if (
            error[0] === 'Advertisements are not available in this moment'
          ) {
            errorTranslate = t(
              'Error.Advertisements are not available in this moment'
            );
          } else if (
            error[0] === 'Internal Error: Impossible create the advertisement'
          ) {
            errorTranslate = t(
              'Error.Internal Error: Impossible create the advertisement'
            );
          } else if (error[0] === 'Advertisement not in DB') {
            errorTranslate = t('Error.Advertisement not in DB');
          } else if (error[0] === 'This email do not have an account') {
            errorTranslate = t('Error.This email do not have an account');
          } else if (error[0] === 'Wrong password') {
            errorTranslate = t('Error.Wrong password');
          } else if (error[0] === 'Internal Server Error') {
            errorTranslate = t('Error.Internal Server Error');
          } else if (error[0] === 'no jwtToken provided') {
            errorTranslate = t('Error.no jwtToken provided');
          } else if (error[0] === 'Invalid jwtToken') {
            errorTranslate = t('Error.Invalid jwtToken');
          } else if (error[0] === 'The file must be an image') {
            errorTranslate = t('Error.The file must be an image');
          } else if (error[0] === 'Network Error') {
            errorTranslate = t('Error.Network Error');
          } else if (error[0] === 'This username is not available') {
            errorTranslate = t('Error.This username is not available');
          } else if (error[0] === 'This email is already registered') {
            errorTranslate = t('Error.This email is already registered');
          } else if (error[0] === "Passwords don't match") {
            errorTranslate = t("Error.Passwords don't match");
          } else if (
            error[0] === "This is not the page you're looking for..."
          ) {
            errorTranslate = t(
              "Error.This is not the page you're looking for..."
            );
          } else {
            errorTranslate = error;
          }
          return (
            <div
              key={error}
              className='error-container'>
              <div className='error-body'>
                <p>ERROR</p>
                <p
                  key={error}
                  {...props}>
                  {errorTranslate}
                </p>
                <Button
                  type='button'
                  className='error-close'
                  onClick={resetUiError}>
                  <i className='bi bi-x-square-fill'></i>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
