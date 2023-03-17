import classNames from 'classnames';
import { t } from 'i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  editAdAction,
  getAdById,
  loadOneAdByIdAction,
} from '../../store/adsListSlice';
import { useIsLoggedSelector } from '../../store/authSlice';
import {
  useIsFetchingSelector,
  useUiErrorSelector,
  errorUi,
  request,
  success,
} from '../../store/uiSlice';
import Button from '../commons/button/Button';
import { Error } from '../commons/error/Error';
import Checkbox from '../commons/forms/checkbox/Checkbox';
import Input from '../commons/forms/input/Input';
import InputFile from '../commons/forms/inputFile/InputFile';
import Select from '../commons/forms/select/Select';
import Textarea from '../commons/forms/textarea/Textarea';
import Modal from '../commons/modal/Modal';
import NoImage from '../commons/noImage/NoImage';
import Spinner from '../commons/spinner/Spinner';
import Tags from '../commons/tags/Tags';
import { updateAdvertisement } from './service';

const EditAdvertisement = ({ className, ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const advertId = useParams().id.split('-', 1)[0];

  const advert = useSelector(getAdById(advertId));
  const isFetching = useIsFetchingSelector();
  const isError = useUiErrorSelector();

  if (!advert) {
    dispatch(loadOneAdByIdAction(advertId));
  }

  //TODO deshardcodear los tags
  const tagsOpt = ['lifestyle', 'sport', 'motor', 'players'];
  const { user } = useIsLoggedSelector();
  const userLoggedId = user._id;

  const [form, setForm] = useState(advert);

  const enterElementHandleChange = (event) => {
    if (
      event.target.type === 'text' ||
      event.target.tagName === 'TEXTAREA' ||
      event.target.type === 'number'
    ) {
      setForm({ ...form, [event.target.name]: event.target.value });
    }

    if (event.target.type === 'checkbox') {
      const value = event.target.checked;
      setForm({ ...form, [event.target.name]: value });
    }

    if (event.target.name === 'tags') {
      const { selectedOptions } = event.target;
      const tags = [...selectedOptions].map((option) => option.value);

      setForm({ ...form, [event.target.name]: tags });
    }
    if (event.target.type === 'file') {
      setForm({ ...form, [event.target.name]: event.target.files[0] });
    }
  };

  const updateAdvert = async (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append('name', form.name ? form.name : advert.name);

    bodyFormData.append('price', form.price ? form.price : advert.price);
    bodyFormData.append('stock', form.stock ? form.stock : advert.stock);
    bodyFormData.append(
      'description',
      form.description ? form.description : advert.description
    );

    bodyFormData.append('custom', form.custom ? form.custom : advert.custom);

    bodyFormData.append('active', form.active ? form.active : advert.active);
    bodyFormData.append('tags', form.tags ? form.tags : advert.tags);

    bodyFormData.append('idUser', advert.idUser._id);

    if (form.photo) {
      bodyFormData.append('image', form.photo ? form.photo : advert.image);
    }

    try {
      dispatch(request());
      const response = await updateAdvertisement(advert._id, bodyFormData);
      dispatch(editAdAction(response.result));
      dispatch(success());
      const to = `/advertisements/${advert._id}-${advert.name}`;
      navigate(to);
    } catch (error) {
      dispatch(errorUi(error.message));
    }
  };

  const onDelete = () => {
    console.log('delete');
  };

  return (
    <form
      className={classNames('py-5 ads-edit-form blur-secondary-800', className)}
      {...props}
      onSubmit={updateAdvert}
    >
      <div className='container px-4 px-lg-5 my-5'>
        <div className='row gx-4 gx-lg-5 '>
          <div className='col-md-6 image'>
            <div className='edit-image mb-3 bg-light px-3 py-4'>
              {isFetching && <Spinner />}
              {isError.length && <Error arrayErrors={isError} />}
              {advert?.image ? (
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/${advert.image}`}
                  className='card-img-top'
                  alt='...'
                />
              ) : (
                <NoImage />
              )}
              <InputFile
                label={t('NewAdvertisement.Photo')}
                className='mt-3'
                name='photo'
                id='photo'
                onChange={enterElementHandleChange}
              />
            </div>
          </div>
          <div className='col-md-6 ads-info '>
            <div className='edit-name mb-3 bg-light px-3 py-2'>
              <h1
                className='display-5 fw-bolder name'
                key='name'
              >
                {advert?.name}
              </h1>
              <Input
                className='mb-2'
                type='text'
                name='name'
                label={t('NewAdvertisement.Name')}
                placeholder={advert?.name}
                value={form?.name}
                onChange={enterElementHandleChange}
              />
            </div>
            <div className='edit-price mb-3 bg-light px-3 py-2'>
              <div className='price'>
                <span
                  key='price'
                  className='label-info'
                >
                  {t('AdsDetailPage.Price')}:
                </span>
                <span> {advert?.price}€</span>
              </div>
              <Input
                type='number'
                label={t('NewAdvertisement.Price')}
                name='price'
                placeholder={advert?.price}
                onChange={enterElementHandleChange}
                value={form?.price}
              />
            </div>
            <div className='edit-stock mb-3 bg-light px-3 py-2'>
              <div className='stock'>
                <span
                  key='stock'
                  className='label-info'
                >
                  Stock:
                </span>
                <span> {advert?.stock}</span>
              </div>
              <Input
                type='number'
                label='Stock'
                name='stock'
                placeholder={advert?.stock}
                onChange={enterElementHandleChange}
                value={form?.stock}
              />
            </div>
            <div className='edit-description mb-3 bg-light px-3 py-2'>
              <div
                className='description'
                key='description'
              >
                <p className='label-info'>{t('AdsDetailPage.Description')}:</p>
                <p>{advert?.description}</p>
              </div>
              <Textarea
                className=''
                label={t('NewAdvertisement.Description')}
                placeholder={advert?.description}
                value={form?.description}
                name='description'
                onChange={enterElementHandleChange}
              ></Textarea>
            </div>
            <div className='edit-tags mb-3 bg-light px-3 py-3'>
              <div className='tags'>
                <p className='label-info'>Tags: </p>
                <Tags tagsArray={advert?.tags} />
              </div>
              <Select
                label={t('NewAdvertisement.Tags')}
                className='w-50'
                name='tags'
                optionarray={tagsOpt}
                onChange={enterElementHandleChange}
                value={form?.tags}
                multiple={true}
              />
            </div>
            <div className='edit-tags mb-3 bg-light px-3 py-3'>
              <Checkbox
                label={t('NewAdvertisement.Active')}
                name='active'
                checked={form?.active}
                onChange={enterElementHandleChange}
              />
            </div>
            <div className='edit-tags mb-3 bg-light px-3 py-3'>
              <Checkbox
                label={t('NewAdvertisement.Custom')}
                name='custom'
                checked={form?.custom}
                onChange={enterElementHandleChange}
              />
            </div>
            {isFetching && <Spinner />}
            {advert?.idUser?._id === userLoggedId && (
              <div className='mt-5 actions'>
                <Button
                  type='submit'
                  className='btn btn-secondary blur-secondary-800 radius-2  '
                >
                  {t(`AdsDetailPage.Edit`)}
                </Button>
                <Modal
                  hasConfirm
                  modalTitle={t(`AdsDetailPage.ModalTitle`)}
                  doTask={onDelete}
                  classNameBtn='ms-2 btn-secondary'
                  classNameBtnClose='btn-secondary'
                  classNameBtnConfirm='btn-primary'
                  classNameContent='body'
                  label_confirm={t(`AdsDetailPage.Delete`)}
                  label_cancel={t(`AdsDetailPage.Cancel`)}
                  label_btn={t(`AdsDetailPage.Delete`)}
                  modalId='deleteAdvert'
                >
                  {t(`AdsDetailPage.ModalText`)}
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
export default EditAdvertisement;
