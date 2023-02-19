import client from "../../api/client";

const advertisementsURL = "/api/advertisement";

export const getAdvertisements = (skip, limit) => {
  const sk = skip ? skip : 0;
  const lim = limit ? limit : 10;
  return client.get(`${advertisementsURL}?skip=${sk}&limit=${lim}`);
};

export const createAdvertisement = (advertData) => {
  const url = `${advertisementsURL}`;
  return client.post(url, advertData);
};

export const getAdvertisementDetail = (advertId) => {
  const url = `${advertisementsURL}/${advertId}`;
  return client.get(url);
};

export const deleteAdvertisement = (id) => {
  console.log(id);
  const url = `${advertisementsURL}/${id}`;
  return client.delete(url);
};
