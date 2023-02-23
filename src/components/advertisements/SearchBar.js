import classNames from 'classnames';
import Input from '../commons/forms/input/Input';
import Range from '../commons/forms/range/Range';
import styles from './SearchBar.module.css';

const SearchBar = ({ className, filters, ...props }) => {
  return (
    <div
      className={classNames(styles.searchBar, className)}
      {...props}
    >
      <Input
        label='Search by name'
        name='name'
        value={filters.name}
      ></Input>
      <Input
        label='Search by tag'
        name='tag'
        value={filters.tag}
      ></Input>
      <Range
        label='Price Range'
        id='priceRange'
        name='price'
        min='0'
        max='100'
        value='20'
      >
        <option
          value='0'
          label='0'
        />
        <option
          value='50'
          label='50'
        />
        <option
          value='100'
          label='100'
        />
      </Range>
    </div>
  );
};

export default SearchBar;
