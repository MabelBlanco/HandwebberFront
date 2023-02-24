import useDataUser from "../auth/signUp/useDataUser";
import NoImage from "../commons/noImage/NoImage";
import '../commons/card/card.scss';
import Card from "../commons/card/Card";

const initialState = {
  username: '',
  mail: '',
  password: '',
  image: '',
  ads: []
};

const UserAdsList = ({...props}) => {
  const { userSearch } = useDataUser(initialState);

  const advertisements = userSearch?.ads;

    return (
      <div className='row'>
        <div className='col-sm-12 py-5' style={{ textAlign: 'center' }}>
          {' '}
          <div className='card-body'>
            <h2 className='card-title' style={{ fontSize: '50px' }}>
              {userSearch?.username}
            </h2>
          </div>{' '}
          <div className={'header-card'}>
            {userSearch?.image ? (
              <img
                style={{ height: '300px', width: '300px' }}
                src={`${process.env.REACT_APP_API_BASE_URL}/${userSearch?.image}`}
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
              {userSearch?.mail}
            </li>
      </ul>
      {advertisements?.map((element) => {
        const newProps = { ...props, ...element };
        return (
          <Card
            className="col-sm-12 col-lg-3 m-2"
            key={element._id}
            {...newProps}
            link_1={`/advertisements/${element._id}`}
            label_link_1="See more"
          />
        );
      })}
      </div>
      </div>
    )
};

export default UserAdsList;