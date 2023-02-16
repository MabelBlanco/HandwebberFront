const Spinner = ({ ...props }) => {
  return (
    <div class="spinner-border" role="status" {...props}>
      <span class="visually-hidden">Loading...</span>
    </div>
  );
};
export default Spinner;
