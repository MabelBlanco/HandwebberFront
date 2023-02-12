const CheckBox = ({ name, label, ...props }) => {
    return (
      <div>
        <label style={{color: 'whitesmoke'}} htmlFor={name}>{label}</label>
        <input type={'checkbox'} name={name}{...props} />
      </div>
    );
  };
  
  export default CheckBox;
  