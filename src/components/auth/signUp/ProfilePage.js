
import NoImage from '../../commons/noImage/NoImage';
import '../../commons/card/card.scss';
import { Link } from 'react-router-dom';
import Button from '../../commons/button/Button';
import useDataUser from './useDataUser';

const initialState = {
  username: '',
  image: '',
};

const ProfilePage = ({ className, title, ...props }) => {

  const { user, handleLogOut, isLogged } = useDataUser({initialState});

  return (
    <div className='row'>
      <div className='col-sm-6 py-5'>
        <h1 className='col-sm-12 py-5'>{title}</h1>
      </div>

      {isLogged && (
        <div className='col-sm-6 py-5' style={{textAlign: 'right'}}>
          {' '}
          <div className={'header-card'}>
            {user.image ? (
              <img
                style={{ height: '100px', width: '100px' }}
                src={`${process.env.REACT_APP_API_BASE_URL}/${user.image}`}
                className='card-img-top'
                alt='...'
              />
            ) : (
              <NoImage className='card-img-top' />
            )}
          </div>
          <div className='card-body'>
            <h5 className='card-title'>{user.username}</h5>
          </div>
          <div className='card-body actions'>
            <Button
              as={Link}
              type='button'
              className='btn btn-secondary'
              onClick={handleLogOut}
            >
              Logout
            </Button>
            <Button
              as={Link}
              to='/profile'
              type='button'
              className='btn btn-secondary'
            >
              Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;