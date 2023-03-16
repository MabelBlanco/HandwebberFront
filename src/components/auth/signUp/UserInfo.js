import NoImage from '../../commons/noImage/NoImage';
import '../../commons/card/card.scss';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const UserInfo = ({ user }) => {
  const { t } = useTranslation();
  const location = useLocation().pathname;

  return (
    <>
      <div className='card-body py-3'>
        <h2 className='card-title h1'>{user?.username}</h2>
      </div>
      <div className='header-card'>
        {user?.image ? (
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}/${user?.image}`}
            className='rounded-pill w-25 h-25'
            alt='...'
          />
        ) : (
          <NoImage className='card-img-top' />
        )}
      </div>
      {location === '/profile' ? (
        <ul className='list-group list-group-flush my-3'>
          <li
            key='mail'
            className='list-group-item'>
            <span>{t('ProfilePage.Mail')}: </span>
            {user?.mail}
          </li>
        </ul>
      ) : null}
    </>
  );
};

export default UserInfo;
