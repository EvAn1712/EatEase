// 'use client';

import { useState, useEffect } from 'react';
import { Empty, SearchNotFoundIcon, Button, Title } from 'rizzui';
import ProductClassicCard from '@/components/cards/product-classic-card';
import { posFilterValue } from '@/app/shared/point-of-sale/pos-search';
import { useAtomValue } from 'jotai';
import hasSearchedParams from '@/utils/has-searched-params';
import shuffle from 'lodash/shuffle';
import { getDatabase, ref, get } from 'firebase/database';
import Image from 'next/image';

const PER_PAGE = 12;

interface IProduct {
  id: string;
  nom: string;
  prix: number;
  description: string;
  typeProduit: string; // Ajout du typeProduit dans l'interface
  idMenu: string;
  allergenes: string[];
  imageUrl: string;
  stock: number;
  [key: string]: any;
  OrderType: 'Simple';
}
// site
export interface IPosProduct {
  id: number;
  originalId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount: number;
  allergenes: string[];
  typeProduit: string;
  OrderType: 'Simple';
}
async function fetchProductsFromFirebase(): Promise<IPosProduct[]> {
  const db = getDatabase();
  const productsRef = ref(db, 'Produit');
  const snapshot = await get(productsRef);

  if (snapshot.exists()) {
      const productsData = snapshot.val();
      const products: IProduct[] = Object.keys(productsData).map((key) => ({
          id: key,
          ...productsData[key],
      }));

      // Convert IProduct to IPosProduct and include typeProduit
      return products.map((product) => ({
          id: Math.floor(Math.random() * 1000000),
          originalId: product.id,
          name: product.nom,
          description: product.description,
          image: product.imageUrl,
          price: product.prix,
          salePrice: product.prix * 0.9, // Example sale price 10% off
          quantity: product.stock,
          size: 50, // Example size
          discount: 5, // Example discount percentage
          allergenes: product.allergenes,
          typeProduit: product.typeProduit, // Ajout du type de produit
          OrderType: 'Simple', // ou 'Menu' si c'est une formule
      }));
  } else {
      console.log('No data available');
      return [];
  }
}

export default function POSProductsFeed() {
  const [products, setProducts] = useState<IPosProduct[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(PER_PAGE);
  const searchText = useAtomValue(posFilterValue);

  useEffect(() => {
    const fetchData = async () => {
      const productsFromFirebase = await fetchProductsFromFirebase();
      setProducts(productsFromFirebase);
    };

    fetchData();
  }, []);

  console.log(products);

  let productItemsFiltered = [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
  );

  if (searchText.length > 0) {
    productItemsFiltered = products.filter((item) => {
      const label = item.name;
      return label.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  productItemsFiltered = hasSearchedParams()
      ? shuffle(productItemsFiltered)
      : productItemsFiltered;

  // Group products by typeProduit
  const groupedProducts: { [key: string]: IPosProduct[] } = {};
  productItemsFiltered.forEach((product) => {
    if (!groupedProducts[product.typeProduit]) {
      groupedProducts[product.typeProduit] = [];
    }
    groupedProducts[product.typeProduit].push(product);
  });

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + PER_PAGE);
    }, 600);
  }

  return (
      <>
        {Object.keys(groupedProducts).length > 0 ? (
            <>
              {Object.keys(groupedProducts).map((typeProduit, index) => (
                  <div key={index} className="mb-8">
                    <Title as="h2" className="text-xl mb-4">
                      <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{typeProduit.toUpperCase()}</span>
                    </Title>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] @xl:gap-x-6 @xl:gap-y-12 @4xl:grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
                      {groupedProducts[typeProduit]
                          ?.slice(0, nextPage)
                          ?.map((product) => (
                              <ProductClassicCard key={product.id} product={product}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={500}
                                    height={500}
                                    layout="responsive"
                                />
                              </ProductClassicCard>
                          ))}
                    </div>
                  </div>
              ))}
            </>
        ) : (
            <Empty
                image={<SearchNotFoundIcon />}
                text="Aucun résultat"
                className="h-full justify-center"
            />
        )}

        {nextPage < productItemsFiltered?.length ? (
            <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
              <Button isLoading={isLoading} onClick={handleLoadMore}>
                Voir plus
              </Button>
            </div>
        ) : null}
      </>
  );
}
