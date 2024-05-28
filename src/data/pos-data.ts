import { cloneDeep } from 'lodash';

export const posProducts = [
  {
    id: 1,
    nom: 'Chicken curry',
    description: 'South Asian dish',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/1.webp',
    prix: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
    discount: 15,
  },
];

export const posData = cloneDeep(posProducts).map((product) => {
  return {
    ...product,
    id: product.id + posProducts.length,
  };
});
