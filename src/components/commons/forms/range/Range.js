import classNames from 'classnames';
import './range.scss';

const Range = ({ className, label, id, children, ...props }) => {
  return (
    <div className={classNames('', className)}>
      <label
        htmlFor={id}
        className='form-label'>
        {label}
      </label>
      <input
        type='number'
        {...props}
      />
      <input
        type='range'
        className='form-range'
        id={id}
        list={`list-${id}`}
        {...props}
      />
      <datalist id={`list-${id}`}>{children}</datalist>
    </div>
  );
};

export default Range;
