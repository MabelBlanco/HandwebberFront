import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import NoImage from "../noImage/NoImage";
import Tags from "../tags/Tags";
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
  username,
  custom,
  active,
  description,
  subscribers,
  date,
  addFavorites,
  ...props
}) => {
  const { t } = useTranslation();

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
          <span>{t("Card.Description")}: </span>
          {description}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li key="price" className="list-group-item">
          <span>{t("Card.Price")}: </span>
          {price}
        </li>
        <li key="tags" className="list-group-item tags-container">
          <p className="label-info">Tags: </p>
          <Tags tagsArray={tags} />
        </li>
        <li key="date" className="list-group-item">
          <span>{t("Card.Date")}: </span>
          {date}
        </li>
        <li key="stock" className="list-group-item">
          <span>{t("Card.Stock")}: </span>
          {stock}
        </li>{" "}
        <li key="favorites" className="list-group-item favorites">
          <i className="bi bi-heart-fill" onClick={addFavorites}></i>{" "}
          <span className="px-1">{subscribers && subscribers.length}</span>
        </li>
        <li key="user" className="list-group-item">
          <span>{t("Card.User")}: </span>
          {username && (
            <Link
              to={`/profile/user/${username ? username : idUser}`}
              className="card-link"
            >
              {username ? username : idUser}
            </Link>
          )}
        </li>
        <li key="custom" className="list-group-item">
          {custom ? <span> {t("Card.Custom Product")} </span> : ""}
        </li>
      </ul>
      <div className="card-body actions">
        <Link to={link_1} className="card-link">
          {label_link_1}
        </Link>
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
