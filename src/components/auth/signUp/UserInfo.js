import NoImage from '../../commons/noImage/NoImage';
import '../../commons/card/card.scss';
import { useTranslation } from 'react-i18next';

const UserInfo = ({ user }) => {
  const { t } = useTranslation();

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
      <ul className='list-group list-group-flush my-3'>
        <li key='mail' className='list-group-item'>
          <span>{t('ProfilePage.Mail')}: </span>
          {user?.mail}
        </li>
      </ul>
    </>
  );
};

export default UserInfo;