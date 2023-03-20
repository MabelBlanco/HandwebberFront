import client from "../../api/client";

const advertisementsURL = "/api/advertisement";
const tagsURL = "/api/tags"

export const getAdvertisements = (skip, limit, filters) => {
  const sk = skip ? skip : 0;
  const lim = limit ? limit : 10;
  let filtersToApply = "";
  filtersToApply = filters.name
    ? `${filtersToApply}&name=${filters.name}`
    : filtersToApply;
  filtersToApply = filters.tag
    ? `${filtersToApply}&tag=${filters.tag}`
    : filtersToApply;
  filtersToApply = filters.price
    ? `${filtersToApply}&price=-${filters.price}`
    : filtersToApply;
  filtersToApply = filters.idUser
    ? `${filtersToApply}&idUser=${filters.idUser}`
    : filtersToApply;

  //Request chaine
  let request = `${advertisementsURL}?skip=${sk}&limit=${lim}&sort=-update`;
  if (filtersToApply !== "") {
    request = `${request}${filtersToApply}`;
  }
  return client.get(request);
};

export const getUserAdvertisements = (idUser) => {
  return client.get(`${advertisementsURL}?idUser=${idUser}`);
};

export const createAdvertisement = (advertData) => {
  const url = `${advertisementsURL}`;
  return client.post(url, advertData);
};

export const getAdvertisementDetail = (advertId) => {
  const url = `${advertisementsURL}/${advertId}`;
  return client.get(url);
};

export const deleteAdvertisement = (advertId) => {
  console.log(advertId);
  const url = `${advertisementsURL}/${advertId}`;
  return client.delete(url);
};
export const updateAdvertisement = async (advertId, body) => {
  const response = await client.put(`${advertisementsURL}/${advertId}`, body);
  return response;
};
export const updateAdsSubscriptions = async (advertId, body) => {
  const response = await client.put(
    `${advertisementsURL}/${advertId}/adssubscriptions`,
    body
  );
  return response;
};

export const getTags = async () => {
  const response = await client.get(`${tagsURL}`);

  return response;
};
