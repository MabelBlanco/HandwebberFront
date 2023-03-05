import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getUserById } from '../auth/service';
import UserInfo from '../auth/signUp/UserInfo';
import Card from '../commons/card/Card';
import '../commons/card/card.scss';
import { getUserAdvertisements } from './service';

const initialState = {
  username: '',
  mail: '',
  password: '',
  image: '',
  ads: [],
};

const UserAdsList = ({ ...props }) => {
  const [userSearch, setUserSearch] = useState(initialState);

  const { t } = useTranslation();

  //TODO Changed advertisement search by username to advertisement search by id.
  //const userSearchUsername = useParams().username;
  const userSearchId = useParams().username;

  const advertisements = userSearch.ads;

  useEffect(() => {
    const execute = async () => {
      //const userSearchData = await getUserByUsername(userSearchUsername);
      const userSearchData = await getUserById(userSearchId);
      const resultSearch = userSearchData.result;
      const userSearchAds = await getUserAdvertisements(resultSearch._id);
      resultSearch.ads = userSearchAds.result;
      setUserSearch(resultSearch);
    };
    execute();
  }, [userSearchId]);

  return (
    <>
      <div className='row'>
        <div className='col-sm-12 py-2 my-1 text-center'>
          <UserInfo user={userSearch} />
        </div>
      </div>
      <div className='row'>
        {advertisements?.map((element) => {
          const newProps = {
            ...props,
            ...element,
            username: userSearch.username,
          };
          return (
            <Card
              className='col-sm-12 col-lg-3 mx-2'
              key={element._id}
              {...newProps}
              link_1={`/advertisements/${element._id}-${element.name}`}
              label_link_1={t('UserAdsList.See more')}
            />
          );
        })}
      </div>
    </>
  );
};

export default UserAdsList;
