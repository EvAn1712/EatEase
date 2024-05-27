"use client";
import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    listIdAllergenes: number[];
    typeProduit: string;
    listIdMenu: number[];
}

const productList: Product[] = [
    {
        id: 1,
        name: 'Pâtes bolognaises',
        price: 3.5,
        description: 'Délicieuses pâtes accompagnées d\'une sauce bolognaise.',
        listIdAllergenes: [1, 3],
        typeProduit: 'Pâtes',
        listIdMenu: [1, 2]
    },
    {
        id: 2,
        name: 'Salade César',
        price: 4.0,
        description: 'Salade fraîche avec du poulet grillé, des croûtons, du parmesan et de la sauce César.',
        listIdAllergenes: [2],
        typeProduit: 'Salades',
        listIdMenu: [1]
    },
    {
        id: 3,
        name: 'Tartiflette',
        price: 5.0,
        description: 'Plat traditionnel savoyard à base de pommes de terre, de lardons, d\'oignons et de reblochon fondu.',
        listIdAllergenes: [1, 4],
        typeProduit: 'Plats chauds',
        listIdMenu: [2]
    },
    // Ajoutez d'autres produits ici si nécessaire
];

const ProductListAdmin: React.FC = () => {
    const [quantities, setQuantities] = useState<{[key: number]: number}>({});

    const handleIncrement = (productId: number) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 0) + 1
        }));
    };

    const handleDecrement = (productId: number) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0)
        }));
    };

    return (
        <div className="w-4/5 mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Liste des produits</h2>
            <div className="flex flex-col gap-4">
                {productList.map(product => (
                    <div key={product.id} className="flex flex-col border border-gray-300 rounded-md p-4">
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        <p><span className="font-bold underline">Prix:</span> {product.price} €</p>
                        <p><span className="font-bold underline">Description:</span> {product.description}</p>
                        <p><span className="font-bold underline">Type de produit:</span> {product.typeProduit}</p>
                        <p><span className="font-bold underline">Allergènes:</span> {product.listIdAllergenes.join(', ')}</p>
                        <p><span className="font-bold underline">Menus:</span> {product.listIdMenu.join(', ')}</p>
                        <button onClick={() => console.log(`Modifier le produit ${product.id}`)} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 my-2">Modifier</button>
                        <button onClick={() => console.log(`Supprimer le produit ${product.id}`)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 my-2">Supprimer</button>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleDecrement(product.id)} className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">-</button>
                            <span>{quantities[product.id] || 0}</span>
                            <button onClick={() => handleIncrement(product.id)} className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">+</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListAdmin;