import classNames from "classnames";
import Button from "../button/Button";
import NoImage from "../noImage/NoImage";
import "./card.scss";

const Card = ({
  className,
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
  return (
    <div
      className={classNames(`card ${active ? "active" : ""} `, className)}
      {...props}
    >
      <div className="header-card">
        {image ? (
          <img src={image} className="card-img-top" alt="..." />
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
          {tags.join(", ")}
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
          {idUser}
        </li>
        <li key="custom" className="list-group-item">
          {custom ? <span>Custom Product</span> : "Not customizable"}
        </li>
      </ul>
      <div className="card-body actions">
        <Button className="btn btn-primary py-2 px-5">
          <a className="no-link" href={link_1}>
            See
          </a>
        </Button>
        <a href={link_2} className="card-link">
          Another link
        </a>
      </div>
    </div>
  );
};
export default Card;
