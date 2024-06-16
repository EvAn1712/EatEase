"use client";
import React, { useState, useRef, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import type { CartItem } from '@/types';
import toast from 'react-hot-toast';
import { Button, EmptyProductBoxIcon, Title, Text, Modal } from 'rizzui';
import cn from '@/utils/class-names';
import { useCart } from '@/store/quick-cart/cart.context';
import POSOrderProducts from '@/app/shared/point-of-sale/pos-order-products';
import DrawerHeader from '@/app/shared/drawer-header';
import app from '@/app/(main)/firebase-config';
import { getDatabase, ref, set, push } from 'firebase/database';
import { AuthContextType, useAuthContext } from '@/app/(main)/authContext';
import PaymentForm from '@/app/(main)/PaymentForm.js';

type POSOrderTypes = {
  className?: string;
  simpleBarClassName?: string;
  orderedItems: CartItem[];
  onOrderSuccess?: () => void;
  removeItemFromCart: (id: number) => void;
  clearItemFromCart: (id: number) => void;
};

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Clé API publique de test

export default function POSDrawerView({
  className,
  simpleBarClassName,
  orderedItems,
  onOrderSuccess,
  removeItemFromCart,
  clearItemFromCart,
}: POSOrderTypes) {
  const [loading, setLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { user } = useAuthContext() as AuthContextType;
  const { resetCart } = useCart();
  const paymentRef = useRef<HTMLDivElement>(null);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false); // État pour contrôler l'affichage de la modal

  useEffect(() => {
    if (showPaymentForm) {
      paymentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showPaymentForm]);

  async function handleOrder() {
    if (!user) {
      toast.error(<Text as="b">Vous devez être connecté pour passer une commande</Text>);
      return;
    }

    setShowPaymentForm(true);
  }

  const handlePaymentSuccess = async (amount: number, description: string, paymentMethodId: string, paymentSuccess: boolean) => {
    setLoading(true);
    try {
      const db = getDatabase(app);
      const orderRef = ref(db, 'CLICommande');
      const newOrderRef = push(orderRef);
      const orderTime = new Date().toISOString();
      const userEmail = user?.email;
      const statut = paymentSuccess;
      const total = orderedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const productDetails = orderedItems.map(i => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
      }));

      await set(newOrderRef, {
        productDetails,
        orderTime,
        userEmail,
        total,
        statut,
        type: 'MENU',
      });

      toast.success(<Text as="b">Commande passée avec succès !</Text>);
      setShowOrderSuccessModal(true);

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(<Text as="b">Erreur lors de la création de la commande</Text>);
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'sticky top-3 flex h-[calc(100vh-120px)] flex-col justify-between rounded-lg border border-muted pb-7 xl:top-24 overflow-hidden', // Modifié ici
        className
      )}
    >
      <DrawerHeader
        heading="Panier"
        onClose={() => (onOrderSuccess ? onOrderSuccess() : () => null)}
      />
      <div className="px-5 pb-0 pe-3 lg:px-7 lg:pb-0 flex-1">
        {!!orderedItems?.length && (
          <>
            <POSOrderProducts
              orderedItems={orderedItems}
              removeItemFromCart={removeItemFromCart}
              clearItemFromCart={clearItemFromCart}
              itemClassName="pe-4"
              simpleBarClassName={simpleBarClassName}
              showControls
            />
            <div className="border-t border-gray-300 p-5 pb-0 lg:p-7">
              <PriceCalculation />
              <div className="flex flex-col gap-4">
                <Button
                  className={cn("h-11 w-full", { "opacity-50 cursor-not-allowed": !user })}
                  isLoading={loading}
                  onClick={handleOrder}
                  disabled={!user}
                >
                  Commander
                </Button>
              </div>
            </div>
            {showPaymentForm && (
              <div className="p-5 lg:p-7" ref={paymentRef}>
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </div>
            )}
          </>
        )}
      </div>
      {!orderedItems?.length && (
        <div className="flex h-full flex-col justify-between">
          <span />
          <div>
            <EmptyProductBoxIcon className="mx-auto h-auto w-52 text-gray-400" />
            <Title as="h5" className="mt-6 text-center">
              Panier vide
            </Title>
            <Text className="mt-1 text-center">Ajouter au moins un article ! </Text>
          </div>
          <div className="px-4">
            <Button
              className="w-full"
              variant="flat"
              onClick={() => (onOrderSuccess ? onOrderSuccess() : () => null)}
            >
              Retour
            </Button>
          </div>
        </div>
      )}
      <Modal isOpen={showOrderSuccessModal} onClose={() => setShowOrderSuccessModal(false)}>
        <div className="p-5">
          <Title as="h2" className="text-lg font-semibold mb-3">
            Commande passée avec succès !
          </Title>
          <Text>
            Vous pouvez venir récupérer votre commande dans 15 minutes mais elle sera considérée comme abandonnée après 1 heure. Aucun remboursement possible.
          </Text>
          <div className="flex justify-end mt-5">
            <Button onClick={() => {
              setShowOrderSuccessModal(false);
              resetCart();
              setLoading(false);
              if (onOrderSuccess) onOrderSuccess();
              setShowPaymentForm(false);
            }}>
              Fermer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const TAX_PERCENTAGE = 0;

export function PriceCalculation() {
  const { items } = useCart();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = total * (TAX_PERCENTAGE / 100);
  const subTotal = total + tax;

  return (
    <div className="mb-7 space-y-3.5">
      <p className="flex items-center justify-between">
        <span className="text-gray-500">Total</span>
        <span className="font-medium text-gray-900">€{total.toFixed(2)}</span>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-gray-500">TVA</span>
        <span className="font-medium text-gray-900">€{tax.toFixed(2)}</span>
      </p>
      <p className="flex items-center justify-between border-t border-gray-300 pt-3.5 text-base font-semibold">
        <span className="text-gray-900">Total:</span>
        <span className="text-gray-900">€{subTotal.toFixed(2)}</span>
      </p>
    </div>
  );
}
