import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../commons/button/Button";
import Checkbox from "../commons/forms/checkbox/Checkbox";
import Input from "../commons/forms/input/Input";
import InputFile from "../commons/forms/inputFile/InputFile";
import Select from "../commons/forms/select/Select";
import Textarea from "../commons/forms/textarea/Textarea";
import { useAuth } from "../context/AuthContext";
import "./advertisements.scss";
import { createAdvertisement } from "./service";

const NewAdvertisement = ({ ...props }) => {
  const navigate = useNavigate();
  const { user, isLogged } = useAuth();
  const { t } = useTranslation();
  const tagsOpt = ["lifestyle", "sport", "motor", "players"];

  const [form, setForm] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    active: false,
    custom: false,
    tags: [],
    photo: "",
  });

  const enterElementHandleChange = (event) => {
    console.log(user.username, isLogged);
    // console.log(event.target.type);
    // console.log(form);

    if (
      event.target.type === "text" ||
      event.target.tagName === "TEXTAREA" ||
      event.target.type === "number"
    ) {
      setForm({ ...form, [event.target.name]: event.target.value });
    }

    if (event.target.type === "checkbox") {
      const value = event.target.checked;
      setForm({ ...form, [event.target.name]: value });
    }

    if (event.target.tagName === "SELECT") {
      console.log(event.target.tagName);
      const { selectedOptions } = event.target;
      const tags = [...selectedOptions].map((value) => value.value);
      setForm({ ...form, [event.target.name]: tags });
    }
    if (event.target.type === "file") {
      setForm({ ...form, [event.target.name]: event.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyFormData = new FormData();
    bodyFormData.append("name", form.name);
    bodyFormData.append("price", form.price);
    bodyFormData.append("tags", form.tags);
    bodyFormData.append("description", form.description);
    bodyFormData.append("custom", form.custom);
    bodyFormData.append("stock", form.stock);
    bodyFormData.append("active", form.active);
    bodyFormData.append("username", user.username);
    form.photo && bodyFormData.append("image", form.photo);
    console.log({ ...form });
    try {
      const advert = await createAdvertisement(bodyFormData);
      navigate(`/advertisements/${advert.result._id}-${advert.result.name} `);
    } catch (error) {
      if (error.statusCode === 401) {
        navigate("/login");
      }
      if (error.statusCode === 404) {
        navigate("/404");
      }
      console.log(error);
    }
  };

  const validPrice = (price) => form.price > 0 && !Number.isNaN(form.price);
  const validTags = (tags) => !!form.tags.length;
  const validName = (name) => form.name;
  const isDisabled = useMemo(() => {
    return !!(
      validName(form.name) &&
      validPrice(form.price) &&
      validTags(form.tags)
    );
    // eslint-disable-next-line
  }, [form.name, form.price, form.tags]);
  return (
    <div className="row">
      <h1 className="col-sm-12 py-5">{props.title}</h1>
      <div className="col-sm-12">
        <form className="row bg-light p-5" onSubmit={handleSubmit}>
          <Input
            className="col-md-4 col-lg-4 mb-5"
            type="text"
            name="name"
            label={t("NewAdvertisement.Name")}
            required
            onChange={enterElementHandleChange}
            value={form.name}
          />
          <Input
            type="number"
            label={t("NewAdvertisement.Price")}
            className="col-sm-4 col-lg-4 mb-5"
            name="price"
            required
            onChange={enterElementHandleChange}
            value={form.price}
          />
          <Input
            type="number"
            label={t("NewAdvertisement.Stock")}
            className="col-sm-4 col-lg-4 mb-5"
            name="stock"
            required
            onChange={enterElementHandleChange}
            value={form.stock}
          />
          <Textarea
            className="col-sm-12 mb-5"
            label={t("NewAdvertisement.Description")}
            value={form.description}
            onChange={enterElementHandleChange}
            name="description"
          ></Textarea>
          <Select
            label={t("NewAdvertisement.Tags")}
            className="col-md-6 col-lg-6 mb-5"
            optionarray={tagsOpt}
            onChange={enterElementHandleChange}
            value={form.tags}
            required
            multiple={true}
            name="tags"
          />

          <InputFile
            label={t("NewAdvertisement.Photo")}
            className="col-md-6 mb-5"
            name="photo"
            id="photo"
            onChange={enterElementHandleChange}
          />

          <Checkbox
            label={t("NewAdvertisement.Active")}
            className="col-md-4 mb-2"
            name="active"
            value={form.active}
            onChange={enterElementHandleChange}
          />
          <Checkbox
            label={t("NewAdvertisement.Custom")}
            className="col-md-4 mb-2"
            name="custom"
            value={form.custom}
            onChange={enterElementHandleChange}
          />
          <Button
            type="submit"
            classNameContainer="col-md-12 mt-5 align-right"
            className="btn-secondary mb-2"
            disabled={!isDisabled}
          >
            {t("NewAdvertisement.Add Advertisement")}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default NewAdvertisement;
