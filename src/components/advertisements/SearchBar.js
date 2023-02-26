import classNames from 'classnames';
import Button from '../commons/button/Button';
import Input from '../commons/forms/input/Input';
import Range from '../commons/forms/range/Range';
import styles from './SearchBar.module.css';

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
      className={classNames(styles.searchBar, className)}
      {...props}
    >
      <Input
        label='Search by name'
        name='name'
        value={filters.name}
        onChange={onChange}
        className={classNames(className, 'col-sm-12 col-lg-5 m-2')}
      ></Input>
      <Input
        label='Search by tag'
        name='tag'
        value={filters.tag}
        onChange={onChange}
        className={classNames(className, 'col-sm-12 col-lg-5 m-2')}
      ></Input>
      <Range
        label='Price Range'
        id='priceRange'
        name='price'
        min='0'
        max={max}
        value={filters.price}
        onChange={onChange}
        className={classNames(className, 'col-12')}
      >
        {options.map((element) => {
          return (
            <option
              value={element}
              label={element}
              key={element}
            />
          );
        })}
      </Range>
      <Button
        className={classNames(className, 'btn btn-secondary col-3')}
        name='resetFilters'
        onClick={onChange}
        {...props}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default SearchBar;
