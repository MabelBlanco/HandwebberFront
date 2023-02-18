import client from '../../api/client';

const advertisementsURL = '/api/advertisement';

export const getAdvertisements = (skip, limit) => {
  const sk = skip ? skip : 0;
  const lim = limit ? limit : 10;
  return client.get(`${advertisementsURL}?skip=${sk}&limit=${lim}`);
};

export const createAdvertisements = (advertData) => {
  const url = `${advertisementsURL}`;
  return client.post(url, advertData);
};
