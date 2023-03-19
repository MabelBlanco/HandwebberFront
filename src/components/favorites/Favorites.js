const Favorites = ({
  addFavorites,
  subscribers,
  styleFavoriteBtn,
  ...props
}) => {
  return (
    <div key="favorites" className="list-group-item favorites" {...props}>
      <i
        className={`bi bi-heart-fill ${styleFavoriteBtn}`}
        onClick={addFavorites}
      ></i>
      <span className="px-1">{subscribers && subscribers.length}</span>
    </div>
  );
};
export default Favorites;
