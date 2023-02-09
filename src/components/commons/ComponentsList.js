import Input from "../commons/forms/input/Input";
import CheckBox from "./forms/checkBox/CheckBox";
const ComponentsList = () => {
  return (
    <div className="row">
      <div className="col col-6">
        <h1>listado de compenentes</h1>
        <p>Inputs</p>
        <Input />
        <p>checkBox</p>
        <CheckBox />
      </div>
    </div>
  );
};
export default ComponentsList;
