const DetailAdvertisement = ({ ...props }) => {
  //const [currentValue, setNewValue] = useState([]);
  //useEffect(() => {
  //setNewValue(currentValue);
  //.then((currentValue) => setNewValue(currentValue));
  //}, []);
  return (
    <div>
      {/*console.log(currentValue)*/}
      test DetailAdvertisement
      <h1 className="col-sm-12 py-5">{props.title}</h1>
    </div>
  );
};
export default DetailAdvertisement;
