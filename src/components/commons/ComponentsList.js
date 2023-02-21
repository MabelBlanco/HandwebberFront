import { useState } from "react";
import Input from "../commons/forms/input/Input";
import Card from "./card/Card";
import Checkbox from "./forms/checkbox/Checkbox";
import InputFile from "./forms/inputFile/InputFile";
import Range from "./forms/range/Range";
import Select from "./forms/select/Select";
import Modal from "./modal/Modal";
import Pagination from "./pagination/Pagination";
import Spinner from "./spinner/Spinner";

const ComponentsList = () => {
  const [options, setOptions] = useState([]);
  const optionsArray = ["uno", "dos", "tres"];
  const handleChangeSelect = (e) => {
    setOptions(e.target.value);
    console.log(options);
  };
  const handleDoTask = () => console.log("ok, dotask");

  return (
    <div className="row p-4 bg-light">
      <div className="row">
        <h1 className="col col-12 text-center p-5">listado de componentes</h1>
        <Input label="Input label" className="col-md-6 pb-5" />
        <Select
          label="Tags"
          className="col-md-6 col-lg-6 mb-5"
          optionarray={optionsArray}
          onChange={handleChangeSelect}
          multiple={false}
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
        <div className="col-md-4">
          <Modal
            modalTitle="titulo para la modal"
            doTask={handleDoTask}
            hasConfirm
            classNameBtn="m-2 btn-secondary"
            classNameBtnClose="btn-secondary"
            classNameBtnConfirm="btn-primary"
            classNameContent="body"
            label_confirm="que si que vale :)"
            label_cancel="paso :("
            label_btn="modal"
            modalId="hola"
          >
            ¿Estas seguro?
          </Modal>
          <Modal
            modalTitle="titulo para la modal"
            label_btn="modal sin confirmación"
            modalId="que"
            label_cancel="que cierroooo xxx"
          >
            Modal sin confirmación
          </Modal>
          <Pagination />
        </div>
      </div>
    </div>
  );
};
export default ComponentsList;
