import "./spinner.scss";
const Spinner = ({ ...props }) => {
  return (
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
};
export default Spinner;
