import { useState } from "react";
import Input from "../commons/forms/input/Input";
import Card from "./card/Card";
import Checkbox from "./forms/checkbox/Checkbox";
import InputFile from "./forms/inputFile/InputFile";
import Range from "./forms/range/Range";
import InputSelect from "./forms/select/Select";
import Spinner from "./spinner/Spinner";

const ComponentsList = () => {
  const [options, setOptions] = useState([]);

  const onChangeSelect = (e) => {
    setOptions(e.selectedValue);
    console.log(options);
  };
  const optionsArray = [
    {
      label: "0",
      value: 0,
      disable: true,
    },
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
  ];
  return (
    <div className="row p-4 bg-light">
      <div className="row">
        <h1 className="col col-12 text-center p-5">listado de componentes</h1>
        <Input label="Input label" className="col-md-6 pb-5" />
        <InputSelect
          className="col-md-6 pb-5"
          options={optionsArray}
          onChange={onChangeSelect}
          label="select"
        />
        <Range label="range label" className="col-md-6 pb-5" />
        <InputFile label="input field" className="col-md-6 pb-5" />
        <Checkbox label="checkbox label" className="col-md-6 pb-5" />
        <Spinner className="col-md-6 pb-5" />
        <Card
          className="col-md-4 pb-5"
          label_link_1="see more"
          label_button_1="edit"
          label_button_2="delete"
        />
      </div>
    </div>
  );
};
export default ComponentsList;
