import classNames from "classnames";
import Button from "../commons/button/Button";
import Input from "../commons/forms/input/Input";
import Range from "../commons/forms/range/Range";

const SearchBar = ({ className, filters, max, onChange, ...props }) => {
  const rangeLabels = () => {
    if (!max) return [];
    const increment = Math.ceil(max / 3);
    let incrementsArray = [0];
    for (let index = 0; index < 3; index++) {
      incrementsArray.push(increment * (index + 1));
    }
    return incrementsArray;
  };
  const options = rangeLabels();
  return (
    <div
      className={classNames(/*styles.searchBar*/ "row", className)}
      {...props}
    >
      <Input
        label="Search by name"
        name="name"
        value={filters.name}
        onChange={onChange}
        className={classNames("col-sm-12 col-lg-6 mb-3 ", className)}
      ></Input>
      <Input
        label="Search by tag"
        name="tag"
        value={filters.tag}
        onChange={onChange}
        className={classNames("col-sm-12 col-lg-6 mb-3", className)}
      ></Input>
      <Range
        label="Price Range"
        id="priceRange"
        name="price"
        min="0"
        max={max}
        value={filters.price}
        onChange={onChange}
        className={classNames("col-sm-12 range", className)}
      >
        {options.map((element) => {
          return <option value={element} label={element} key={element} />;
        })}
      </Range>
      <Button
        className={classNames("btn btn-secondary align-self-end", className)}
        name="resetFilters"
        onClick={onChange}
        {...props}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default SearchBar;
