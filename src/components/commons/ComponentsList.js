import Input from "../commons/forms/input/Input";
import Checkbox from "./forms/checkBox/CheckBox";
import InputFile from "./forms/inputFile/InputFile";
import Range from "./forms/range/Range";
import Select from "./forms/select/Select";
const ComponentsList = () => {
  return (
    <div className="row p-4 bg-light">
      <div className="row">
        <h1 className="col col-12 text-center p-5">listado de componentes</h1>
        <Input label="Input label" className="col-md-6 pb-5" />
        <Select label="select" className="col-md-6 pb-5" />
        <Range label="range label" className="col-md-6 pb-5" />
        <InputFile label="input field" className="col-md-6 pb-5" />
        <Checkbox label="checkbox label" className="col-md-6 pb-5" />
      </div>
    </div>
  );
};
export default ComponentsList;