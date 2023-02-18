import classNames from "classnames";
import Button from "../commons/button/Button";
import Checkbox from "../commons/forms/checkbox/Checkbox";
import Input from "../commons/forms/input/Input";
import InputFile from "../commons/forms/inputFile/InputFile";
import Select from "../commons/forms/select/Select";

const NewAdvertisement = ({ className, ...props }) => {
  return (
    <div className={classNames("row", className)}>
      <div className="col-sm-12">
        <form className="row bg-light p-5">
          <Input label="name" className="col-md-6 col-lg-4 mb-5" />
          <Input
            type="number"
            label="Price"
            className="col-sm-6 col-lg-4 mb-5"
          />
          <Select label="tags" className="col-md-6 col-lg-4 mb-5" />
          <textarea className="col-sm-6 mb-5">textarea</textarea>
          <InputFile label="photo" className="col-md-6 mb-5" />
          <Checkbox label="Sale" className="col-md-12 mb-2" />
          <Button
            type="submit"
            classNameContainer="col-md-6 mb-5"
            className="btn-secondary mb-2"
          >
            Add Advertisement
          </Button>
        </form>
      </div>
    </div>
  );
};
export default NewAdvertisement;
