import classNames from 'classnames';
import './inputFile.scss';

/**
 *
 * @param {object} props
 * {string} className, label, id,
 * ...props rest of props
 * @returns ReactComponent InputFile
 */
const InputFile = ({ className, label, id, ...props }) => {
  return (
    <div className={classNames('', className)}>
      <label htmlFor={id}>{label}</label>
      <div className='input-group'>
        <input
          type='file'
          className='form-control'
          id={id}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputFile;
