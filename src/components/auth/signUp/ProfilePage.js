import '../../commons/card/card.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../commons/button/Button';
import { deleteUser, getUserPrivateDataById, updateUser } from '../service';
import { useEffect, useState } from 'react';
import styles from './SignUp.module.css';
import { getAdvertisementDetail } from '../../advertisements/service';
import { useTranslation } from 'react-i18next';
import { Error } from '../../commons/error/Error';
import Card from '../../commons/card/Card';
import Modal from '../../commons/modal/Modal';
import Alert from '../../commons/feedbacks/alert/Alert';
import FormUpdateProfile from './FormUpdateProfile';
import UserInfo from './UserInfo';
import {
  authSuccess,
  dispatchLogoutAction,
  useIsLoggedSelector,
} from '../../../store/authSlice';
import {
  useUiErrorSelector,
  errorUi,
  useIsFetchingSelector,
  setUiIsFetching,
  setUiSuccess,
} from '../../../store/uiSlice';
import { useDispatch } from 'react-redux';
import Spinner from '../../commons/spinner/Spinner';
import { filesCorrectDataController } from '../../../utils/filesCorrectDataController';

const initialState = {
  username: '',
  mail: '',
  password: '',
  image: '',
};

const ProfilePage = ({ className, title, ...props }) => {
  const isFetching = useIsFetchingSelector();
  const [credentials, setCredentials] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeForm, setActiveForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { t } = useTranslation();
  const [favorits, setFavorits] = useState([]);
  const [activeFavorits, setActiveFavorits] = useState(false);
  const [userPrivateData, setUserPrivateData] = useState({
    mail: '',
    subscriptions: [],
  });

  const error = useUiErrorSelector();

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(dispatchLogoutAction());
  };
  const { isLogged, user } = useIsLoggedSelector();

  const handleActiveForm = () => setActiveForm(!activeForm);

  const navigate = useNavigate();

  const goToMyAds = () => navigate(`/profile/user/${user.username}`);

  const getMyFavorites = async () => {
    setActiveFavorits(!activeFavorits);
    try {
      const ads = [];
      if (user.subscriptions.length !== favorits.length) {
        for (let ad of user.subscriptions) {
          const favorit = await getAdvertisementDetail(ad);
          ads.unshift(favorit.result);
        }
        setFavorits(ads);
      }
    } catch (error) {
      console.log(error);
      dispatch(errorUi(error.message));
    }
  };

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

  const updateAccount = async (event) => {
    event.preventDefault();
    const { image, username, mail, password } = credentials;
    if (password !== confirmPassword) {
      const errorMessage = ["Passwords don't match"];
      dispatch(errorUi(errorMessage));
      throw errorMessage;
    }

    const formData = new FormData();

    username && formData.append('username', username.toLowerCase());
    mail && formData.append('mail', mail);
    password && formData.append('password', password);
    if (image) {
      const control = filesCorrectDataController(image, dispatch);
      if (!control) return;
      formData.append('image', image);
    }
    //image && formData.append('image', image);

    try {
      dispatch(setUiIsFetching());
      const { result } = await updateUser(user._id, formData);
      result.ads = user.ads;
      dispatch(authSuccess(result));
      dispatch(setUiSuccess());
      setActiveForm(false);
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

  const deleteAccount = async () => {
    try {
      const response = await deleteUser(user._id);

      setIsDelete(true);
      setTimeout(() => {
        handleLogOut();
        navigate('/advertisements');
        setIsDelete(false);
      }, 1500);
      return response;
    } catch (error) {
      dispatch(errorUi([error.message]));
    }
  };

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
      return;
    }
    const getPrivateData = async () => {
      try {
        const response = await getUserPrivateDataById(user._id);
        const data = { ...response.result, ...user };
        setUserPrivateData(data);
      } catch (error) {
        dispatch(errorUi(error));
      }
    };
    dispatch(setUiIsFetching());
    getPrivateData();
    dispatch(setUiSuccess());
  }, [dispatch, isLogged, navigate, user._id, user]);

  return (
    <div className='row'>
      {isFetching && <Spinner />}
      {isLogged && !isDelete && (
        <div className='col-sm-12 py-2 my-1 text-center'>
          <UserInfo user={userPrivateData} />
          <ul className='list-group list-group-flush my-3'>
            <li
              key='subscriptions'
              className='list-group-item'>
              <span>{t('ProfilePage.Favorites')}: </span>
              <Button
                type='button'
                className='btn btn-secondary mx-3 my-3'
                onClick={getMyFavorites}>
                {t('ProfilePage.SEE MY FAVORITS ADS')}
              </Button>
              <div className='row'>
                {activeFavorits &&
                  favorits?.map((element) => {
                    const newProps = { ...props, ...element };
                    return (
                      <Card
                        className='col-sm-12 col-lg-3 mx-2 my-5'
                        key={element._id}
                        {...newProps}
                        link_1={`/advertisements/${element._id}`}
                        label_link_1={t('UserAdsList.See more')}
                      />
                    );
                  })}
              </div>
            </li>
            <li
              key='ads'
              className='list-group-item'>
              <span>{t('ProfilePage.My advertisements')}: </span>
              <Button
                type='button'
                className='btn btn-secondary mx-3 my-3'
                onClick={goToMyAds}>
                {t('ProfilePage.GO TO MY ADVERTISEMENTS LIST')}
              </Button>
            </li>
            <li
              key='update'
              className='list-group-item'>
              <Button
                type='button'
                className='btn btn-secondary mx-3 my-3'
                onClick={handleActiveForm}>
                {t('ProfilePage.CLICK FOR UPDATE YOUR PROFILE')}
              </Button>
              {error && (
                <Error
                  className={styles.signup__error}
                  arrayErrors={error}
                />
              )}
              {activeForm && (
                <FormUpdateProfile
                  updateAccount={updateAccount}
                  handleCredentials={handleCredentials}
                  credentials={credentials}
                  handleConfirmPassword={handleConfirmPassword}
                  confirmPassword={confirmPassword}
                  handleImage={handleImage}
                  isFetching={isFetching}
                />
              )}
            </li>
            <li
              key='delet'
              className='list-group-item'>
              <Modal
                hasConfirm
                modalTitle={t('ProfilePage.DELETE ACCOUNT')}
                doTask={deleteAccount}
                classNameBtn='ms-2 btn-secondary'
                classNameBtnClose='btn-secondary'
                classNameBtnConfirm='btn-primary'
                classNameContent='body'
                label_confirm={t(`AdsDetailPage.Delete`)}
                label_cancel={t(`AdsDetailPage.Cancel`)}
                label_btn={t('ProfilePage.DELETE ACCOUNT')}
                modalId='deleteUser'>
                {t('ProfilePage.Are you sure for delete account?')}
              </Modal>
            </li>
          </ul>
        </div>
      )}
      {isDelete && (
        <Alert className='alert-success'>
          {t('ProfilePage.Deleted successfully')}
        </Alert>
      )}
    </div>
  );
};

export default ProfilePage;
