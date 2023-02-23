import classNames from 'classnames';
import './range.scss';

const Range = ({ className, label, id, children, ...props }) => {
  console.log(children);
  return (
    <div className={classNames('', className)}>
      <label
        htmlFor={id}
        className='form-label'
      >
        {label}
      </label>
      <input
        type='range'
        className='form-range'
        id={id}
        list={`list-${id}`}
        {...props}
      />
      <datalist id={`list-${id}`}>{children}</datalist>

      {
        //children & <datalist id={id}>{children}</datalist>
      }
    </div>
  );
};

export default Range;
