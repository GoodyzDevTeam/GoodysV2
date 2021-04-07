import faker from 'faker';
import { sample } from 'lodash';
import mock from 'src/utils/mock';
import { paramCase } from 'change-case';
import { getImgProduct } from 'src/utils/getImages';

// ----------------------------------------------------------------------

const ARTICLE_NAME = [
  'Cannabis 101',
  'Products & Strains',
  'CBD',
  'Laws',
  'Cultivation'
];

const ARTICLE_DESCRIPTION = `
<p><strong><small> SPECIFICATION</small></strong></p>
<p>Leather panels. Laces. Rounded toe. Rubber sole.
<br /><br />
<p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>
<p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>
`;

let articles = [...Array(24)].map((article, index) => {
  const setIndex = index + 1;

  return {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${setIndex}`,
    cover: {
      thumb: getImgProduct(128, setIndex),
      small: getImgProduct(720, setIndex),
      medium: getImgProduct(960, setIndex)
    },
    images: [...Array(8)].map((image, index) => {
      const setIndex = index + 1;
      return {
        thumb: getImgProduct(128, setIndex),
        small: getImgProduct(600, setIndex),
        medium: getImgProduct(960, setIndex),
        large: getImgProduct(1440, setIndex)
      };
    }),
    name: ARTICLE_NAME[index],
    status: sample(['new', '', '']),
    createdAt: faker.date.past()
  };
});

// ----------------------------------------------------------------------

mock.onGet('/api/articles').reply(200, { articles });

// ----------------------------------------------------------------------

mock.onGet('/api/products/product').reply((config) => {
  try {
    const { name } = config.params;
    const article = articles.find(
      (_article) => paramCase(_article.name) === name
    );

    if (!article) {
      return [404, { message: 'article not found' }];
    }

    return [200, { article }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------
