import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Card from '../commons/card/Card';
import Pagination from '../commons/pagination/Pagination';
import { countAdvertisements, getAdvertisements } from './service';
const MAX_RESULTS_PER_PAGE = 12; //12;

export const useAdvertisement = () => {
  const [adsList, setAdsList] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    tag: '',
    price: 0,
  });

  const handleFilters = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const numPages = async () => {
    let adsCount = 0;
    try {
      adsCount = await countAdvertisements();
    } catch (error) {
      //TODO
      console.log('Error contando los anuncios');
    }
    return Math.ceil(adsCount.result / MAX_RESULTS_PER_PAGE);
  };

  const firstPage = () => {
    setPage(1);
  };

  const nextPage = async () => {
    const maxPages = await numPages();
    if (page === maxPages) return;
    setPage(page + 1);
  };
  const previousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const lastPage = async () => {
    const lastPage = await numPages();
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
  } = useAdvertisement();
  return (
    <div
      className='row'
      {...props}
    >
      <SearchBar
        onChange={handleFilters}
        filters={filters}
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
