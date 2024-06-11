"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '@/store/quick-cart/cart.context';
import { CartItem as Item } from '@/types';
import { get, getDatabase, ref } from "firebase/database";
import app from "src/app/(main)/firebase-config";

import { AuthContextType, useAuthContext } from '@/app/(main)/authContext';

interface ValiderBtnProps {
    items: { id: string; nom: string; section: string }[];
    formule: { id: string; nom: string };
}

const ValiderBtn: React.FC<ValiderBtnProps> = ({ items, formule }) => {
    const { addItemToCart } = useCart();
    const [formuleData, setFormuleData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showContent, setShowContent] = useState<boolean>(false);
    const { user } = useAuthContext() as AuthContextType;
    

    const fetchFormuleData = useCallback(async () => {
        try {
            const db = getDatabase(app);
            const dbRef = ref(db, `Menu/${formule.id}`);
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                setFormuleData(snapshot.val());
            } else {
                console.error('Formule data not found');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching formule data: ', error);
            setLoading(false);
        }
    }, [formule.id]);

    useEffect(() => {
        fetchFormuleData();
    }, [fetchFormuleData, formule]);

    const handleAddToCart = () => {
        if (loading || !formuleData) {
            console.error('Formule data not available yet or loading');
            return;
        }

        const item: Item = {
            size: 0,
            id: 1,
            name: formuleData.nom,
            price: formuleData.prix,
            quantity: 1,
            image: formuleData.imageUrl || '',
            description: `Composition: ${items.map(item => item.nom).join(', ')}`
        };

        addItemToCart(item, item.quantity);
        setShowContent(true); // Show content when the button is clicked
        
    };

    return (
        <div className="mt-3 flex justify-end">
            <button 
                onClick={handleAddToCart} 
                disabled={!user} 
                className={`py-3 px-6 rounded-lg text-lg focus:outline-none ${!user ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
            >
                Ajouter au panier
            </button>
            {showContent && (
                <div>
                    {/* Render content here */}
                    <p>ID: {formuleData.id}</p>
                    <p>Name: {formuleData.nom}</p>
                    <p>Price: {formuleData.prix}</p>
                </div>
            )}
        </div>
    );
};

export default ValiderBtn;
