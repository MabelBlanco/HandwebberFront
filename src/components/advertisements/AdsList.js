import { useState } from 'react';
import SearchBar from './SearchBar';
import Card from '../commons/card/Card';
import Pagination from '../commons/pagination/Pagination';
import { useTranslation } from 'react-i18next';
import Spinner from '../commons/spinner/Spinner';
import { Error } from '../commons/error/Error';
import {
  useAdsListSelector,
  useDispatchFetchAdsAction,
  useMetaSelector,
} from '../../store/adsListSlice';
import { useIsFetchingSelector, useUiErrorSelector } from '../../store/uiSlice';
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

  //Redux adslist handles
  const meta = useMetaSelector();
  const { totalNumOfAds, maxPrice } = meta;

  //Redux pagination handles
  const firstPageSelector = useFirstPage();
  const firstPage = () => firstPageSelector(first());
  const lastPageSelector = useLastPage();
  const lastPage = () => lastPageSelector(last(totalNumOfAds));
  const previousPageSelector = usePrevious();
  const previousPage = () => previousPageSelector(previous());
  const nextPageSelector = useNext();
  const nextPage = () => nextPageSelector(next(totalNumOfAds));

  const handleFilters = (event) => {
    if (event.target.name === 'resetFilters') {
      setFilters(initialFiltersState);
      return;
    }
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return {
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    filters,
    handleFilters,
    maxPrice,
  };
};

const AdsList = ({ ...props }) => {
  const { t } = useTranslation();

  const {
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    filters,
    handleFilters,
    maxPrice,
  } = useAdvertisement();

  //Redux UI handles
  const adsIsFetching = useIsFetchingSelector();
  const error = useUiErrorSelector();

  //Redux pagination handles
  const page = useActualPage();
  const skip = MAX_RESULTS_PER_PAGE * (page - 1);

  //Redux adslist handles
  const advertisements = useAdsListSelector();

  useDispatchFetchAdsAction(skip, MAX_RESULTS_PER_PAGE, filters);

  return (
    <div
      className='row'
      {...props}
    >
      <SearchBar
        className='row'
        onChange={handleFilters}
        filters={filters}
        max={maxPrice}
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
