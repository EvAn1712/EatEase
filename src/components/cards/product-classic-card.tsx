'use client';

import React from 'react';
import Image from 'next/image';
import { Title, Text, Button } from 'rizzui';
import cn from '@/utils/class-names';
import { CartItem, PosProduct } from '@/types';
import { toCurrency } from '@/utils/to-currency';
import { PiMinus, PiPlus } from 'react-icons/pi';
import { useCart } from '@/store/quick-cart/cart.context';

interface ProductProps {
  product: PosProduct;
  className?: string;
}

export default function ProductClassicCard({
  product,
  className,
}: ProductProps) {
  const { name, description, price, image, salePrice, allergenes, quantity } = product;
  const { addItemToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    if (quantity > 0) {
      addItemToCart(product, 1);
    }
  };

  return (
    <div className={cn('pb-0.5', className)}>
      <div className="relative">
        <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            alt={name}
            src={image}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw"
            className="h-full w-full object-cover"
          />
          {quantity === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold">Indisponible</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3">
        <Title as="h6" className="mb-1 truncate font-inter font-semibold">
          {name}
        </Title>

        <Text as="p" className="truncate">
          Allergènes : {allergenes ? allergenes.join(', ') : 'Aucun'}
        </Text>
        <div className="mt-2 flex items-center font-semibold text-gray-900">
          {toCurrency(Number(price))}
        </div>
        <div className="mt-3">
          {isInCart(product.id) ? (
            <QuantityControl item={product} />
          ) : (
            <Button onClick={handleAddToCart} className="w-full" variant="outline" disabled={quantity === 0}>
              {quantity > 0 ? 'Ajouter' : 'Indisponible'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function QuantityControl({ item }: { item: CartItem }) {
  const { addItemToCart, removeItemFromCart, getItemFromCart } = useCart();
  return (
    <div className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-1 duration-200 hover:border-gray-900">
      <button
        title="Decrement"
        className="flex items-center justify-center rounded p-2 duration-200 hover:bg-gray-100 hover:text-gray-900"
        onClick={() => removeItemFromCart(item.id)}
      >
        <PiMinus className="h-3.5 w-3.5" />
      </button>
      <span className="grid w-8 place-content-center font-medium">
        {getItemFromCart(item.id).quantity}
      </span>
      <button
        title="Increment"
        className="flex items-center justify-center rounded p-2 duration-200 hover:bg-gray-100 hover:text-gray-900"
        onClick={() => addItemToCart(item, 1)}
      >
        <PiPlus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
