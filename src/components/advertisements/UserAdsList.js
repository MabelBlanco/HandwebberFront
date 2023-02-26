import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getUserById } from "../auth/service";
import Card from "../commons/card/Card";
import "../commons/card/card.scss";
import NoImage from "../commons/noImage/NoImage";
import { getUserAdvertisements } from "./service";

const initialState = {
  username: "",
  mail: "",
  password: "",
  image: "",
  ads: [],
};

const UserAdsList = ({ ...props }) => {
  const [userSearch, setUserSearch] = useState(initialState);

  const { t } = useTranslation();

  const userSearchId = useParams().userId;

  const advertisements = userSearch.ads;

  useEffect(() => {
    const execute = async () => {
      const userSearchData = await getUserById(userSearchId);
      const resultSearch = userSearchData.result;
      const userSearchAds = await getUserAdvertisements(userSearchId);
      resultSearch.ads = userSearchAds.result;
      setUserSearch(resultSearch);
    };
    execute();
  }, [userSearchId]);

  return (
    <>
      <div className="row">
        <div className="col-sm-12 py-5 my-5 text-center">
          {" "}
          <div className="card-body py-3">
            <h2 className="card-title h1">{userSearch?.username}</h2>
          </div>{" "}
          <div className="header-card">
            {userSearch?.image ? (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/${userSearch?.image}`}
                className="rounded-pill w-25 h-25"
                alt="..."
              />
            ) : (
              <NoImage className="card-img-top" />
            )}
          </div>
          <ul className="list-group list-group-flush">
            <li key="mail" className="list-group-item text-center">
              <span>{t("UserAdsList.Mail")}: </span>
              {userSearch?.mail}
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        {advertisements?.map((element) => {
          const newProps = { ...props, ...element };
          return (
            <Card
              className="col-sm-12 col-lg-3 mx-2"
              key={element._id}
              {...newProps}
              link_1={`/advertisements/${element._id}-${element.name}`}
              label_link_1={t("UserAdsList.See more")}
            />
          );
        })}
      </div>
    </>
  );
};

export default UserAdsList;
