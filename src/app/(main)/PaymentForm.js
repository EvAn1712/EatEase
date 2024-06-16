import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ onPaymentSuccess, amount }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const description = 'Description du menu acheté';

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name,
                email,
            },
        });

        if (error) {
            setErrors({ card: error.message });
            return;
        }

        let paymentIntent;

        try {
            const response = await fetch('http://localhost:3001/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100, // Convertir en centimes
                    
                    payment_method: paymentMethod.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { client_secret, error: serverError } = await response.json();

            if (serverError) {
                setErrors({ card: serverError.message });
                onPaymentSuccess(amount, description, paymentMethod.id, false);
                return;
            }

            const { error: confirmError, paymentIntent: intent } = await stripe.confirmCardPayment(client_secret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setErrors({ card: confirmError.message });
                onPaymentSuccess(amount, description, paymentMethod.id, false);
                return;
            }

            paymentIntent = intent;
        } catch (error) {
            setErrors({ card: error.message });
            onPaymentSuccess(amount, description, paymentMethod.id, false);
            return;
        }

        onPaymentSuccess(amount, description, paymentMethod.id, true);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">Montant à payer :</span>
                    <strong className="text-lg">{amount}€</strong>
                </div>
                
            </div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">Détails de paiement</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom sur la carte</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Informations de la carte</label>
                    <div className="p-2 border border-gray-300 rounded">
                        <CardElement />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    Payer
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
