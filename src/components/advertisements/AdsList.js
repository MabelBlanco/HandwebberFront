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
const MAX_RESULTS_PER_PAGE = 1; //12;

export const useAdvertisement = () => {
  const initialFiltersState = {
    name: '',
    tag: '',
    price: '',
  };
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initialFiltersState);
  const [adsIsFetching, setAdsIsFetching] = useState(false);
  const [error, setError] = useState([]);

  const dispatch = useDispatchAdsList();
  const adsList = useAdsListSelector();
  const meta = useMetaSelector();

  const handleFilters = (event) => {
    if (event.target.name === 'resetFilters') {
      setFilters(initialFiltersState);
      return;
    }
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const numPages = () => {
    return Math.ceil(meta.totalNumOfAds / MAX_RESULTS_PER_PAGE);
  };

  const firstPage = () => {
    setPage(1);
  };

  const nextPage = () => {
    const maxPages = numPages();
    if (page === maxPages) return;
    setPage(page + 1);
  };
  const previousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const lastPage = () => {
    const lastPage = numPages();
    setPage(lastPage);
  };

  useEffect(() => {
    const execute = async () => {
      const skip = MAX_RESULTS_PER_PAGE * (page - 1);
      setAdsIsFetching(true);
      try {
        const ads = await getAdvertisements(
          skip,
          MAX_RESULTS_PER_PAGE,
          filters
        );
        dispatch(adsLoadSuccess(ads));
      } catch (err) {
        setError([err.message]);
      }
      setAdsIsFetching(false);
    };
    execute();
  }, [page, filters, dispatch]);

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
