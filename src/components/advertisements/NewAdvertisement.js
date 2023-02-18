import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../commons/button/Button";
import Checkbox from "../commons/forms/checkbox/Checkbox";
import Input from "../commons/forms/input/Input";
import InputFile from "../commons/forms/inputFile/InputFile";
import Select from "../commons/forms/select/Select";
import Textarea from "../commons/forms/textarea/Textarea";
import "./advertisements.scss";
import { createAdvertisements } from "./service";

const NewAdvertisement = ({ ...props }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [custom, setCustom] = useState(false);
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState();
  const navigate = useNavigate();
  const tagsOpt = ["lifestyle", "sport", "motor", "players"];

  // useEffect(() => {
  //   const execute = async () => {
  //     try {
  //       // const optTags = await getAdversTags();
  //       // setTagsOpt(optTags);
  //     } catch (error) {
  //       if (error.statusCode === 401) {
  //         navigate("/login");
  //       }
  //       if (error.statusCode === 404) {
  //         navigate("/404", { state: { message: error.statusCode } });
  //       }
  //       navigate("/404", { state: { message: error } });
  //     }
  //   };
  //   execute();
  // }, [navigate]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);
  const handleChangeStock = (e) => setStock(e.target.value);
  const handleChangeActive = (e) => setActive(e.target.checked);
  const handleChangeCustom = (e) => setCustom(e.target.checked);
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
  const handleChangeImage = (e) => {
    setPhoto(e.target.files[0]);
  };
  const validPrice = (price) => price > 0 && !Number.isNaN(price);
  const validTags = (tags) => !!tags.length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("price", price);
    bodyFormData.append("tags", tags);
    bodyFormData.append("description", description);
    bodyFormData.append("custom", custom);
    bodyFormData.append("stock", stock);
    bodyFormData.append("active", active);
    bodyFormData.append("idUser", "123testing");
    if (photo) {
      bodyFormData.append("image", photo);
    }
    console.log(bodyFormData);

    try {
      const advert = await createAdvertisements(bodyFormData);
      navigate(`/advertisement/${advert.result._id}`);
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

  const isDisabled = useMemo(() => {
    return !!(name && validPrice(price) && validTags(tags));
  }, [name, price, tags]);

  return (
    <div className="row">
      <h1 className="col-sm-12 py-5">{props.title}</h1>
      <div className="col-sm-12">
        <form className="row bg-light p-5" onSubmit={handleSubmit}>
          <Input
            className="col-md-4 col-lg-4 mb-5"
            type="text"
            name="name"
            label="Name"
            required
            onChange={handleChangeName}
            value={name}
          />
          <Input
            type="number"
            label="Price"
            className="col-sm-4 col-lg-4 mb-5"
            name="price"
            required
            onChange={handleChangePrice}
            value={price}
          />
          <Input
            type="number"
            label="Stock"
            className="col-sm-4 col-lg-4 mb-5"
            name="price"
            required
            onChange={handleChangeStock}
            value={stock}
          />
          <Textarea
            className="col-sm-12 mb-5"
            label="Description"
            value={description}
            onChange={handleChangeDescription}
          ></Textarea>
          <Select
            label="Tags"
            className="col-md-6 col-lg-6 mb-5"
            optionarray={tagsOpt}
            onChange={handleChangeSelect}
            value={tags}
            required
            multiple={true}
          />

          <InputFile
            label="Photo"
            className="col-md-6 mb-5"
            name="photo"
            id="photo"
            onChange={handleChangeImage}
          />

          <Checkbox
            label="Active"
            className="col-md-4 mb-2"
            value={active}
            onChange={handleChangeActive}
          />
          <Checkbox
            label="Custom"
            className="col-md-4 mb-2"
            value={custom}
            onChange={handleChangeCustom}
          />
          <Button
            type="submit"
            classNameContainer="col-md-12 mt-5 align-right"
            className="btn-secondary mb-2"
            disabled={!isDisabled}
          >
            Add Advertisement
          </Button>
        </form>
      </div>
    </div>
  );
};
export default NewAdvertisement;
