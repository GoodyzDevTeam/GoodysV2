// ----------------------------------------------------------------------

export const BASE_IMG =
  'https://res.cloudinary.com/trinhmai/image/upload/c_scale,f_auto,q_auto,';

export const getImgCover = (width, index) =>
  `${BASE_IMG}w_${width}/v1611411356/upload_minimal/covers/cover_${index}.jpg`;

export const getImgFeed = (width, index) =>
  `https://www.spokesdigital.us/Assets/img/cannabisdispensary_2.jpg`;
// `${BASE_IMG}w_${width}/v1611420989/upload_minimal/feeds/feed_${index}.jpg`;

export const getImgDispensary = (width, index) =>
  `https://www.medmen.com/img/meta/1024x1024.jpg`;

export const getImgProduct = (width, index) =>
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ZwcCK68QlfQ8volNCVyTDrt0XMBntx08cg&usqp=CAU`;
// `${BASE_IMG}w_${width}/v1611420989/upload_minimal/products/shose_${index}.jpg`;

export const getImgAvatar = (index) =>
  `/static/images/avatars/avatar_${index}.jpg`;

// Only Home Page
export const getImgComponent = (width, name, mode) =>
  `${BASE_IMG}w_${width}/v1611426110/upload_minimal/components/${name}_${mode}.jpg`;
