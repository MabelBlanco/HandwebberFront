import NoImage from '../noImage/NoImage';

const Card = ({
  link_1,
  link_2,
  image,
  name,
  price,
  tags,
  stock,
  idUser,
  custom,
  active,
  description,
  date,
  ...props
}) => {
  // console.log(tags);
  // console.log(typeof tags);
  return (
    <div
      className={`card ${active ? 'active' : ''}`}
      style={{ width: '18rem' }}
      {...props}
    >
      {image ? (
        <img
          src={image}
          className='card-img-top'
          alt='...'
        />
      ) : (
        <NoImage className='card-img-top' />
      )}
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <p className='card-text'>
          <span>Description: </span>
          {description}
        </p>
      </div>
      <ul className='list-group list-group-flush'>
        <li
          key='price'
          className='list-group-item'
        >
          <span>Price: </span>
          {price}
        </li>
        <li
          key='tags'
          className='list-group-item'
        >
          <span>Tags: </span>
          {tags.join(', ')}
        </li>
        <li
          key='date'
          className='list-group-item'
        >
          <span>Date: </span>
          {date}
        </li>
        <li
          key='stock'
          className='list-group-item'
        >
          <span>Stock: </span>
          {stock}
        </li>
        <li
          key='user'
          className='list-group-item'
        >
          <span>Usuario: </span>
          {idUser}
        </li>
        <li
          key='custom'
          className='list-group-item'
        >
          {custom ? <span>'Custom Product'</span> : ''}
        </li>
      </ul>
      <div className='card-body'>
        <a
          href={link_1}
          className='card-link'
        >
          Card link
        </a>
        <a
          href={link_2}
          className='card-link'
        >
          Another link
        </a>
      </div>
    </div>
  );
};
export default Card;
