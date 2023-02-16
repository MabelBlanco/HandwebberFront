import NoImage from "../noImage/NoImage";

const Card = ({
  link_1,
  link_2,
  image,
  name,
  price,
  tags,
  description,
  date,
  ...props
}) => {
  return (
    <div className="card" style={{ width: "18rem" }} {...props}>
      {image ? (
        <img src={image} className="card-img-top" alt="..." />
      ) : (
        <NoImage className="card-img-top" />
      )}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{price}</li>
        <li className="list-group-item">{tags}</li>
        <li className="list-group-item">{date}</li>
      </ul>
      <div className="card-body">
        <a href={link_1} className="card-link">
          Card link
        </a>
        <a href={link_2} className="card-link">
          Another link
        </a>
      </div>
    </div>
  );
};
export default Card;
