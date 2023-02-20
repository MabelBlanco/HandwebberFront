import NoImage from '../../commons/noImage/NoImage';
import '../../commons/card/card.scss';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../commons/button/Button';
import useDataUser from './useDataUser';
import { deleteUser } from '../service';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const initialState = {
  username: '',
  image: '',
};

const ProfilePage = ({ className, title, ...props }) => {
  const { user } = useDataUser(initialState);
  const {isLogged, handleLogOut} = useAuth();

  const navigate = useNavigate();

  const deleteCount = async () => {
    try {
      const response = await deleteUser(user._id);
      handleLogOut();
      navigate('/');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !isLogged && navigate('/')
  },[isLogged, navigate])

  return (
    <div className='row'>
      {isLogged && (
        <div className='col-sm-12 py-5' style={{ textAlign: 'center' }}>
          {' '}
          <div className='card-body'>
            <h2 className='card-title' style={{ fontSize: '50px' }}>
              {user?.username}
            </h2>
          </div>{' '}
          <div className={'header-card'}>
            {user?.image ? (
              <img
                style={{ height: '300px', width: '300px' }}
                src={`${process.env.REACT_APP_API_BASE_URL}/${user?.image}`}
                className='card-img-top'
                alt='...'
              />
            ) : (
              <NoImage className='card-img-top' />
            )}
          </div>
          <ul className='list-group list-group-flush'>
            <li key='mail' className='list-group-item'>
              <span>Mail: </span>
              {user?.mail}
            </li>
            <li key='subscriptions' className='list-group-item'>
              <span>Favorites: </span>
              <ul>
                {user?.subscriptions &&
                  user.subscriptions.map((e) => (
                    <li key={e}>
                      <Link to={`/advertisements/${e}`}>{e}</Link>
                    </li>
                  ))}
              </ul>
            </li>
            <li key='ads' className='list-group-item'>
              <span>My advertisements: </span>
              <ul>
                {user?.ads &&
                  user.ads.map((e) => (
                    <li key={e._id}>
                      <Link to={`/advertisements/${e._id}`}>{e.name}</Link>
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
          <div className='card-body actions'>
            <Button
              type='button'
              className='btn btn-secondary mx-3'
              onClick={deleteCount}
            >
              DELETE COUNT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
