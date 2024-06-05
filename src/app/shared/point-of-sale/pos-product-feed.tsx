'use client';

import { useState, useEffect } from 'react';
import { Empty, SearchNotFoundIcon, Button } from 'rizzui';
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
  typeProduit: string;
  idMenu: string;
  allergenes: string[];
  imageUrl: string;
  stock: number;
  [key: string]: any;
}

export interface IPosProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount: number;
  allergenes: string[];
}

async function fetchProductsFromFirebase(): Promise<IPosProduct[]> {
  const db = getDatabase();
  const productsRef = ref(db, 'Produit');
  const snapshot = await get(productsRef);

  if (snapshot.exists()) {
    const productsData = snapshot.val();
    return Object.keys(productsData).map((key) => {
      const product: IProduct = {
        id: key,
        ...productsData[key],
      };

      // Convert IProduct to IPosProduct
      return {
        id: Math.floor(Math.random() * 1000000), 
        name: product.nom,
        description: product.description,
        image: product.imageUrl,
        price: product.prix,
        salePrice: product.prix * 0.9, // Example sale price 10% off
        quantity: product.stock,
        size: 50, // Example size
        discount: 15, // Example discount percentage
        allergenes: product.allergenes,
      };
    });
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
  console.log(products)
  

  let productItemsFiltered = [...products].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (searchText.length > 0) {
    productItemsFiltered = products.filter((item) => {
      const label = item.name;
      return (
        label.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  productItemsFiltered = hasSearchedParams()
    ? shuffle(productItemsFiltered)
    : productItemsFiltered;

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + PER_PAGE);
    }, 600);
  }

  return (
    <>
      {productItemsFiltered?.length ? (
        <div className="grid  grid-cols-2 gap-x-4 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] @xl:gap-x-6 @xl:gap-y-12 @4xl:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] ">
          {productItemsFiltered
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
      ) : (
        <Empty
          image={<SearchNotFoundIcon />}
          text="No Result Found"
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
