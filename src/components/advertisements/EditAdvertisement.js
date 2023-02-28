import classNames from "classnames";
import { t } from "i18next";
import { useEffect, useState } from "react";
import Button from "../commons/button/Button";
import Input from "../commons/forms/input/Input";
import InputFile from "../commons/forms/inputFile/InputFile";
import Select from "../commons/forms/select/Select";
import Textarea from "../commons/forms/textarea/Textarea";
import Modal from "../commons/modal/Modal";
import NoImage from "../commons/noImage/NoImage";
import Tags from "../commons/tags/Tags";
import useDataAdvert from "./useDataAdvert";

const EditAdvertisement = ({ className, ...props }) => {
  const advert = useDataAdvert();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState();
  const [tags, setTags] = useState([]);
  const tagsOpt = ["lifestyle", "sport", "motor", "players"];

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);
  const handleChangeStock = (e) => setStock(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeImage = (e) => setPhoto(e.target.files[0]);
  const handleChangeSelect = (e) => {
    var options = e.target.options;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value.toString());
      }
    }
    setTags(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("name", name ? name : advert.name);
    bodyFormData.append("price", price ? price : advert.price);
    bodyFormData.append("stock", stock ? stock : advert.stock);
    bodyFormData.append(
      "description",
      description ? description : advert.description
    );
    bodyFormData.append("image", photo ? photo : advert.image);
    console.log("bodyform", {
      name: bodyFormData.get("name"),
      price: bodyFormData.get("price"),
      stock: bodyFormData.get("stock"),
      description: bodyFormData.get("description"),
      image: bodyFormData.get("image"),
    });
  };

  const onDelete = () => {
    console.log("delete");
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const execute = async () => {};
      execute();
    }

    return () => {
      isMounted = false;
    };
  }, [advert]);

  return (
    <form
      className={classNames("py-5 ads-edit-form blur-secondary-800", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 ">
          <div className="col-md-6 image">
            <div className="edit-image mb-3 bg-light px-3 py-4">
              {advert.image ? (
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/${advert.image}`}
                  className="card-img-top"
                  alt="..."
                />
              ) : (
                <NoImage />
              )}
              <InputFile
                label={t("NewAdvertisement.Photo")}
                className="mt-3"
                name="photo"
                id="photo"
                onChange={handleChangeImage}
              />
            </div>
          </div>
          <div className="col-md-6 ads-info ">
            <div className="edit-name mb-3 bg-light px-3 py-2">
              <h1 className="display-5 fw-bolder name" key="name">
                {advert.name}
              </h1>
              <Input
                className="mb-2"
                type="text"
                name="name"
                label={t("NewAdvertisement.Name")}
                placeholder={advert.name}
                value={name}
                onChange={handleChangeName}
              />
            </div>
            <div className="edit-price mb-3 bg-light px-3 py-2">
              <div className="price">
                <span key="price" className="label-info">
                  {t("AdsDetailPage.Price")}:
                </span>
                <span> {advert.price}€</span>
              </div>
              <Input
                type="number"
                label={t("NewAdvertisement.Price")}
                name="price"
                placeholder={advert.price}
                onChange={handleChangePrice}
                value={price}
              />
            </div>
            <div className="edit-stock mb-3 bg-light px-3 py-2">
              <div className="stock">
                <span key="stock" className="label-info">
                  Stock:
                </span>
                <span> {advert.stock}</span>
              </div>
              <Input
                type="number"
                label="Stock"
                name="stock"
                placeholder={advert.stock}
                onChange={handleChangeStock}
                value={stock}
              />
            </div>
            <div className="edit-description mb-3 bg-light px-3 py-2">
              <div className="description" key="description">
                <p className="label-info">{t("AdsDetailPage.Description")}:</p>
                <p>{advert.description}</p>
              </div>
              <Textarea
                className=""
                label={t("NewAdvertisement.Description")}
                placeholder={advert.description}
                value={description}
                onChange={handleChangeDescription}
              ></Textarea>
            </div>
            <div className="edit-tags mb-3 bg-light px-3 py-3">
              <div className="tags">
                <p className="label-info">Tags: </p>
                <Tags tagsArray={advert.tags} />
              </div>
              <Select
                label={t("NewAdvertisement.Tags")}
                className="w-50"
                optionarray={tagsOpt}
                onChange={handleChangeSelect}
                value={tags}
                required
                multiple={true}
              />
            </div>
            {advert.idUser === advert.userLoggedId && (
              <div className="mt-5 actions">
                <Button
                  type="submit"
                  className="btn btn-secondary blur-secondary-800 radius-2  "
                >
                  {t(`AdsDetailPage.Edit`)}
                </Button>
                <Modal
                  hasConfirm
                  modalTitle={t(`AdsDetailPage.ModalTitle`)}
                  doTask={onDelete}
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
          </div>
        </div>
      </div>
    </form>
  );
};
export default EditAdvertisement;
