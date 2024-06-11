'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Title, Text, Button } from 'rizzui';
import cn from '@/utils/class-names';
import { CartItem, PosProduct } from '@/types';
import { toCurrency } from '@/utils/to-currency';
import { PiMinus, PiPlus } from 'react-icons/pi';
import { useCart } from '@/store/quick-cart/cart.context';
import Modal from '@/app/(main)/modal/page'; // Assurez-vous d'importer le bon chemin pour votre composant Modal

interface ProductProps {
  product: PosProduct;
  className?: string;
}

export default function ProductClassicCard({
  product,
  className,
}: ProductProps) {
  const { name, description, price, image, salePrice, discount, allergenes } = product;

  const { addItemToCart, isInCart } = useCart();
  
  // État pour gérer la modal d'ajout au panier
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État pour gérer l'option sélectionnée
  const [selectedOption, setSelectedOption] = useState('Simple');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
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
          <button
            className="font-mono font-bold absolute top-2 right-2 text-red-500 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
          >
      
          </button>
        </div>
        {discount ? (
          <Text
            as="span"
            className="absolute start-5 top-5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold dark:bg-gray-200 dark:text-gray-700"
          >
            {discount}% de remise
          </Text>
        ) : null}
      </div>

      <div className="pt-3">
        <Title as="h6" className="mb-1 truncate font-inter font-semibold">
          {name}
        </Title>

        <Text as="p" className="truncate">
          Allergènes : {allergenes ? allergenes.join(', ') : 'Aucun'}
        </Text>
        <div className="mt-2 flex items-center font-semibold text-gray-900">
          {toCurrency(Number(salePrice))}
          {price && (
            <del className="ps-1.5 text-[13px] font-normal text-gray-500">
              {toCurrency(Number(price))}
            </del>
          )}
        </div>
        <div className="mt-3">
          {isInCart(product.id) ? (
            <QuantityControl item={product} />
          ) : (
            <Button onClick={() => {
              addItemToCart(product, 1);
              closeModal();
            }} className="w-full" variant="outline">
              Ajouter
            </Button>
          )}
        </div>
      </div>

      {/* Modal pour ajouter au panier
      <Modal show={isModalOpen} onClose={closeModal}>
        <div>
          <h2 className="text-xl font-semibold">Choisissez une option</h2>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="option"
                value="Simple"
                checked={selectedOption === 'Simple'}
                onChange={handleOptionChange}
              />
              <span className="ml-2">Simple</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio"
                name="option"
                value="Menu"
                checked={selectedOption === 'Menu'}
                onChange={handleOptionChange}
              />
              <span className="ml-2">Menu</span>
            </label>
          </div>
          <Button
            onClick={() => {
              addItemToCart(product, 1);
              closeModal();
            }}
            className="mt-4 w-full"
          >
            Ajouter au panier
          </Button>
        </div>
      </Modal> */}
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
