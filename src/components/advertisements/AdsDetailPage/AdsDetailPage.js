import classNames from "classnames";
import { format } from "date-fns";
import { t } from "i18next";
import Button from "../../commons/button/Button";
import Modal from "../../commons/modal/Modal";
import NoImage from "../../commons/noImage/NoImage";
import Tags from "../../commons/tags/Tags";
import "./adsDetailPage.scss";

const AdsDetailPage = ({
  className,
  fnedit,
  fndelete,
  fncontact,
  fnactive,
  image,
  name,
  price,
  tags,
  stock,
  idUser,
  userLoggedId,
  custom,
  active,
  description,
  update,
  favorites,
  username,
  children,
  addFavorites,
  ...props
}) => {
  return (
    <section
      className={classNames(
        "py-5 ads-detail-page blur-secondary-800",
        className
      )}
      {...props}
    >
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 ">
          <div className="col-md-6 image">
            {image ? (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/${image}`}
                className="card-img-top"
                alt="..."
              />
            ) : (
              <NoImage />
            )}
          </div>
          <div className="col-md-6 ads-info">
            <h1 className="display-5 fw-bolder name" key="name">
              {name}
            </h1>
            <div key="date" className="date">
              <span className="label-info">Date: </span>
              <time dateTime={update}>{format(new Date(), "MM/dd/yyy")}</time>
            </div>
            <div className="fs-5 mb-5 price">
              <span key="price" className="label-info">
                {t("AdsDetailPage.Price")}:
              </span>
              <span> {price}€</span>
            </div>
            <div className="lead description" key="description">
              <p className="label-info">{t("AdsDetailPage.Description")}:</p>
              <p>{description}</p>
            </div>
            <div key="tags" className="list-group-item tags-container">
              <p className="label-info">Tags: </p>
              <Tags tagsArray={tags} />
            </div>
            <div key="stock" className="list-group-item stock">
              <span className="label-info">Stock: </span>
              {stock}
            </div>
            <div key="active" className="list-group-item active">
              {active ? t(`AdsDetailPage.Active`) : t(`AdsDetailPage.Inactive`)}
            </div>
            <div key="user" className="list-group-item user">
              <span className="label-info">Usuario: </span>
              <a href={`/profile/user/${username}`} className="card-link">
                {username}
              </a>
            </div>
            {custom && (
              <div key="custom" className="list-group-item custom">
                <span>Custom Product</span>
              </div>
            )}
            <div key="favorites" className="list-group-item favorites">
              <i className="bi bi-heart-fill" onClick={addFavorites}></i>{" "}
              <span className="px-1">{favorites}</span>
            </div>
            {idUser === userLoggedId && (
              <div className="mt-5 actions">
                <Button
                  type="button"
                  className="btn btn-secondary blur-secondary-800 radius-2  "
                  onClick={fnedit}
                >
                  {t(`AdsDetailPage.Edit`)}
                </Button>
                <Modal
                  hasConfirm
                  modalTitle={t(`AdsDetailPage.ModalTitle`)}
                  doTask={fndelete}
                  classNameBtn="ms-2 btn-secondary"
                  classNameBtnClose="btn-secondary"
                  classNameBtnConfirm="btn-primary"
                  classNameContent="body"
                  label_confirm={t(`AdsDetailPage.Delete`)}
                  label_cancel={t(`AdsDetailPage.Cancel`)}
                  label_btn={t(`AdsDetailPage.Delete`)}
                  modalId="deleteAdvert"
                >
                  {t(`AdsDetailPage.ModalText`)}
                </Modal>
              </div>
            )}
            {idUser !== userLoggedId && (
              <div className="mt-5 actions">
                <Button
                  type="button"
                  className="btn btn-secondary blur-secondary-800 radius-2 ms-3"
                  onClick={fncontact}
                >
                  {t(`AdsDetailPage.Contact`)}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdsDetailPage;