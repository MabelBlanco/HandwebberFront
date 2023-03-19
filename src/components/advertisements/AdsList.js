import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useAdsListSelector,
  useDispatchFetchAdsAction,
  useMetaSelector,
} from "../../store/adsListSlice";
import {
  first,
  last,
  MAX_RESULTS_PER_PAGE,
  next,
  previous,
  useActualPage,
  useFirstPage,
  useLastPage,
  useNext,
  usePrevious,
} from "../../store/paginationSlice";
import { useIsFetchingSelector, useUiErrorSelector } from "../../store/uiSlice";
import styles from "../auth/signUp/SignUp.module.css";
import Accordion from "../commons/accordion/Accordion";
import Card from "../commons/card/Card";
import { Error } from "../commons/error/Error";
import { ReceiveNotification } from "../commons/notification/ReceiveNotification";
import Pagination from "../commons/pagination/Pagination";
import Spinner from "../commons/spinner/Spinner";
import SearchBar from "./SearchBar";

export const useAdvertisement = () => {
  const initialFiltersState = {
    name: "",
    tag: "",
    price: "",
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
    if (event.target.name === "resetFilters") {
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
    <div className="row" {...props}>
      <Accordion
        title={t("AdsList.Filter")}
        children=""
        icon
        iconType="bi-funnel-fill"
        classBody="bg-light p-4 my-2"
        classButton="btn btn-secondary btn-accordion"
        itemTarget="filter"
        itemId="filterId"
      >
        <SearchBar onChange={handleFilters} filters={filters} max={maxPrice} />
      </Accordion>

      <Pagination
        handleFirst={firstPage}
        handlePrevious={previousPage}
        handleNext={nextPage}
        handleLast={lastPage}
      />
      {adsIsFetching && <Spinner />}

      {error && <Error className={styles.signup__error} arrayErrors={error} />}

      {advertisements.map((element) => {
        const newProps = { ...props, ...element };
        return (
          <Card
            className="col-sm-12 col-lg-3 m-2"
            key={element._id}
            {...newProps}
            link_1={`/advertisements/${element._id}-${element.name}`}
            label_link_1={t("AdsList.See more")}
            subscribers={element.subscriptions}
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
