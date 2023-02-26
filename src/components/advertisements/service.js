import client from '../../api/client';

const advertisementsURL = '/api/advertisement';

export const getAdvertisements = (skip, limit, filters) => {
  const sk = skip ? skip : 0;
  const lim = limit ? limit : 10;
  let filtersToApply = '';
  filtersToApply = filters.name
    ? `${filtersToApply}&name=${filters.name}`
    : filtersToApply;
  filtersToApply = filters.tag
    ? `${filtersToApply}&tag=${filters.tag}`
    : filtersToApply;
  filtersToApply = filters.price
    ? `${filtersToApply}&price=-${filters.price}`
    : filtersToApply;

  //Request chaine
  let request = `${advertisementsURL}?skip=${sk}&limit=${lim}&sort=-update`;
  if (filtersToApply !== '') {
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

export const deleteAdvertisement = (id) => {
  console.log(id);
  const url = `${advertisementsURL}/${id}`;
  return client.delete(url);
};
