import { useState } from 'react';
import NoImage from '../../commons/noImage/NoImage';
import './../../commons/card/card.scss';
import decodeToken from '../../../utils/decodeToken';
import storage from '../../../utils/storage';

const Profile = ({ image, username, className, title, ...props }) => {
  const [dataToken, setDataToken] = useState(
    decodeToken(storage.get('auth')).userId || null
  );


  console.log(dataToken);

  return (
    <div className='row'>
      <div className='col-sm-6 py-5'>
        <h1 className='col-sm-12 py-5'>{title}</h1>
      </div>

      {dataToken && (
        <div className='col-sm-6 py-5'>
          {' '}
          <div className={'header-card'}>
            {image ? (
              <img
                style={{ height: '150px', width: '150px' }}
                src={`${process.env.REACT_APP_API_BASE_URL}/${image}`}
                className='card-img-top'
                alt='...'
              />
            ) : (
              <NoImage className='card-img-top' />
            )}
          </div>
          <div className='card-body'>
            <h5 className='card-title'>{username}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
