import { errorUi } from '../store/uiSlice';

const maxFilesSize =
  process.env.REACT_APP_MAX_FILES_SIZE_MB * Math.pow(1024, 2);

export const filesCorrectDataController = (file, dispatch) => {
  let errors = [];
  if (file) {
    if (file.size > maxFilesSize) {
      errors.push('Max. 5MB');
    }
    const type = file.type.split('/');
    if (type[0] !== 'image') {
      errors.push('Only image is allowed');
    }
    if (errors.length > 0) {
      dispatch(errorUi(errors));
      return false;
    }
  }
  return true;
};
