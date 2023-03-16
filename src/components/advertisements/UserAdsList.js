import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../auth/service';
import UserInfo from '../auth/signUp/UserInfo';
import Card from '../commons/card/Card';
import '../commons/card/card.scss';
import { getAdvertisements } from './service';

const initialState = {
  _id: '',
  username: '',
  image: '',
  ads: [],
};

const UserAdsList = ({ ...props }) => {
  const [userSearch, setUserSearch] = useState(initialState);

  const { t } = useTranslation();

  const userSearchUsername = useParams().username;

  const advertisements = userSearch.ads;

  useEffect(() => {
    let userSearchId = null;
    const execute = async () => {
      const userSearchData = await getUserByUsername(userSearchUsername);
      userSearchId = userSearchData.result._id;

      const filter = { idUser: userSearchId };
      const userSearchAds = await getAdvertisements(0, 10000, filter);

      let resultSearch = {};
      resultSearch.ads = userSearchAds.result;
      resultSearch._id = userSearchData.result._id;
      resultSearch.username = userSearchData.result.username;
      resultSearch.image = userSearchData.result.image;

      setUserSearch(resultSearch);
    };
    if (userSearchUsername) execute();
  }, [userSearchUsername]);

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
