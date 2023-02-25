import classNames from "classnames";
import Button from "../button/Button";
import NoImage from "../noImage/NoImage";
import "./card.scss";

/**
 *
 * @param {object} props
 * {string} name, description, idUser
 * {string-path-to} image,
 * {number} price, stock,
 * {boolean} active, custom,
 * {date} date (update)
 * ...props rest of the props
 *
 * @returns ReactComponent Card
 */
const Card = ({
  className,
  label_link_1,
  link_1,
  label_button_1,
  action_button_1,
  label_button_2,
  action_button_2,
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
  return (
    <div
      className={classNames(`card ${active ? "active" : ""}`, className)}
      {...props}
    >
      <div className="header-card">
        {image ? (
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}/${image}`}
            className="card-img-top"
            alt="..."
          />
        ) : (
          <NoImage className="card-img-top" />
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <span>Description: </span>
          {description}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li key="price" className="list-group-item">
          <span>Price: </span>
          {price}
        </li>
        <li key="tags" className="list-group-item">
          <span>Tags: </span>
          {tags && tags.join(", ")}
        </li>
        <li key="date" className="list-group-item">
          <span>Date: </span>
          {date}
        </li>
        <li key="stock" className="list-group-item">
          <span>Stock: </span>
          {stock}
        </li>
        <li key="user" className="list-group-item">
          <span>Usuario: </span>
          <a href={`/profile/${idUser}`} className="card-link">
          {idUser}
        </a>
        </li>
        <li key="custom" className="list-group-item">
          {custom ? <span>'Custom Product'</span> : ""}
        </li>
      </ul>
      <div className="card-body actions">
        <a href={link_1} className="card-link">
          {label_link_1}
        </a>
        {label_button_1 && (
          <Button type="button" className="btn btn-secondary mx-3">
            {label_button_1}
          </Button>
        )}
        {label_button_2 && (
          <Button type="button" className="btn btn-secondary">
            {label_button_2}
          </Button>
        )}
      </div>
    </div>
  );
};
export default Card;
