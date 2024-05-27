"use client";
import React, { useState } from 'react';
import PageHeader from '@/app/shared/page-header';

const PasserCommande: React.FC = () => {
    const [produit, setProduit] = useState('');
    const [quantite, setQuantite] = useState('');

    const produits = ['Produit 1', 'Produit 2', 'Produit 3'];

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Commande soumise:', { produit, quantite });
        setProduit('');
        setQuantite('');
    };

    const pageHeader = {
        title: 'Passer une Commande',
        breadcrumb: [
        ],
    };

    return (
        <div className="w-80 mx-auto py-8">
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} className="[&_h2]:font-lexend [&_h2]:font-bold"/>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="produit" className="text-lg font-bold">Produit:</label>
                    <select
                        id="produit"
                        value={produit}
                        onChange={(e) => setProduit(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        {produits.map((prod, index) => (
                            <option key={index} value={prod}>
                                {prod}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="quantite" className="text-lg font-bold">Quantité:</label>
                    <input
                        type="number"
                        id="quantite"
                        value={quantite}
                        onChange={(e) => setQuantite(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Passer la Commande</button>
            </form>
        </div>
    );
};

export default PasserCommande;
