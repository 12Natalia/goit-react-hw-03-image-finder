const API_KEY = '34713659-8512d0423b25e13e6eda39bc1';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGES_ON_PAGE = 12;

export const searchFunc = (searchText, page) => {
  const params = new URLSearchParams({
    q: searchText,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: IMAGES_ON_PAGE,
  });

  return fetch(`${BASE_URL}?${params}`);
};
