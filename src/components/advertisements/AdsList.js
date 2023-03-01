import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Card from '../commons/card/Card';
import Pagination from '../commons/pagination/Pagination';
import { getAdvertisements } from './service';
import { useTranslation } from 'react-i18next';
import Spinner from '../commons/spinner/Spinner';
import { Error } from '../commons/error/Error';
import {
  adsLoadSuccess,
  useAdsListSelector,
  useDispatchAdsList,
  useMetaSelector,
} from '../../store/adsListSlice';
import {
  request,
  success,
  errorUi,
  useDispatchUi,
  useIsFetchingSelector,
  useUiErrorSelector,
} from '../../store/uiSlice';
import {
  first,
  last,
  next,
  previous,
  useActualPage,
  useFirstPage,
  useLastPage,
  useNext,
  usePrevious,
  MAX_RESULTS_PER_PAGE,
} from '../../store/paginationSlice';

export const useAdvertisement = () => {
  const initialFiltersState = {
    name: '',
    tag: '',
    price: '',
  };

  const [filters, setFilters] = useState(initialFiltersState);

  const dispatchAdsList = useDispatchAdsList();
  const adsList = useAdsListSelector();
  const meta = useMetaSelector();

  const dispatchUi = useDispatchUi();
  const adsIsFetching = useIsFetchingSelector();

  const error = useUiErrorSelector();

  const page = useActualPage();
  const firstPageSelector = useFirstPage();
  const firstPage = () => firstPageSelector(first());
  const lastPageSelector = useLastPage();
  const lastPage = () => lastPageSelector(last(meta.totalNumOfAds));
  const previousPageSelector = usePrevious();
  const previousPage = () => previousPageSelector(previous());
  const nextPageSelector = useNext();
  const nextPage = () => nextPageSelector(next(meta.totalNumOfAds));

  const handleFilters = (event) => {
    if (event.target.name === 'resetFilters') {
      setFilters(initialFiltersState);
      return;
    }
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const execute = async () => {
      const skip = MAX_RESULTS_PER_PAGE * (page - 1);

      dispatchUi(request());
      try {
        const ads = await getAdvertisements(
          skip,
          MAX_RESULTS_PER_PAGE,
          filters
        );
        dispatchAdsList(adsLoadSuccess(ads));
        dispatchUi(success());
      } catch (err) {
        dispatchUi(errorUi(err.message));
      }
    };
    execute();
  }, [page, filters, dispatchAdsList, dispatchUi]);

  return {
    adsList,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    filters,
    handleFilters,
    meta,
    adsIsFetching,
    error,
  };
};

const AdsList = ({ ...props }) => {
  const { t } = useTranslation();

  const {
    adsList: advertisements,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    filters,
    handleFilters,
    meta,
    adsIsFetching,
    error,
  } = useAdvertisement();

  return (
    <div
      className='row'
      {...props}>
      <SearchBar
        className='row'
        onChange={handleFilters}
        filters={filters}
        max={meta.maxPrice}
      />
      <Pagination
        handleFirst={firstPage}
        handlePrevious={previousPage}
        handleNext={nextPage}
        handleLast={lastPage}
      />
      {adsIsFetching && <Spinner />}
      {error.length ? <Error arrayErrors={error} /> : <div></div>}
      {advertisements.map((element) => {
        const newProps = { ...props, ...element };
        return (
          <Card
            className='col-sm-12 col-lg-3 m-2'
            key={element._id}
            {...newProps}
            link_1={`/advertisements/${element._id}-${element.name}`}
            label_link_1={t('AdsList.See more')}
          />
        );
      })}
      <Pagination
        handleFirst={firstPage}
        handlePrevious={previousPage}
        handleNext={nextPage}
        handleLast={lastPage}
      />
    </div>
  );
};

export default AdsList;
