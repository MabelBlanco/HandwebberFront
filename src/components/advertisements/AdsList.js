import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Card from '../commons/card/Card';
import Pagination from '../commons/pagination/Pagination';
import { getAdvertisements } from './service';
const MAX_RESULTS_PER_PAGE = 12; //12;

export const useAdvertisement = () => {
  const initialFiltersState = {
    name: '',
    tag: '',
    price: '',
  };
  const [adsList, setAdsList] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initialFiltersState);

  const handleFilters = (event) => {
    console.log(event);
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
      try {
        const ads = await getAdvertisements(
          skip,
          MAX_RESULTS_PER_PAGE,
          filters
        );
        setAdsList(ads.result);
        setMeta(ads.meta);
      } catch (error) {
        console.log('tenemos un error');
        console.log(error);
      }
    };
    execute();
  }, [page, filters]);
  return {
    adsList,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    filters,
    handleFilters,
    meta,
  };
};

const AdsList = ({ ...props }) => {
  const {
    adsList: advertisements,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    filters,
    handleFilters,
    meta,
  } = useAdvertisement();
  return (
    <div
      className='row'
      {...props}
    >
      <SearchBar
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
      {advertisements.map((element) => {
        const newProps = { ...props, ...element };
        return (
          <Card
            className='col-sm-12 col-lg-3 m-2'
            key={element._id}
            {...newProps}
            link_1={`/advertisements/${element._id}`}
            label_link_1='See more'
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
