const DetailAdvertisement = ({ ...props }) => {
  //const [currentValue, setNewValue] = useState([]);
  //useEffect(() => {
  //setNewValue(currentValue);
  //.then((currentValue) => setNewValue(currentValue));
  //}, []);
  return (
    <div className="row">
      <h1 className="col-sm-12 py-5">{props.title}</h1>
    </div>
  );
};
export default DetailAdvertisement;
