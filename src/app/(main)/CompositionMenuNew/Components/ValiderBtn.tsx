'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '@/store/quick-cart/cart.context';
import { CartItem as Item } from '@/types';
import { get, getDatabase, ref, set, push } from "firebase/database";
import app from "src/app/(main)/firebase-config";
import { AuthContextType, useAuthContext } from '@/app/(main)/authContext';

interface ValiderBtnProps {
    items: { id: string; nom: string; section: string }[];
    formule: { id: string; nom: string };
}

const ValiderBtn: React.FC<ValiderBtnProps> = ({ items, formule }) => {
    const { addItemToCart, resetCart } = useCart();
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

    const handleAddToCart = async () => {
        if (loading || !formuleData) {
            console.error('Formule data not available yet or loading');
            return;
        }

        if (!user) {
            console.error('User not logged in');
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
        setShowContent(true);

        // // Enregistrer la formule et les produits dans Firebase
        // try {
        //     const db = getDatabase(app);
        //     const orderRef = ref(db, 'CLICommande');
        //     const newOrderRef = push(orderRef);
        //     const orderTime = new Date().toISOString();
        //     const userEmail = user.email;
        //     const statut = false;
        //     const total = item.price;

        //     const productDetails = items.map(i => ({
        //         id: i.id,
        //         name: i.nom,
        //         quantity: 1,
        //     }));

        //     await set(newOrderRef, {
        //         formule: {
        //             id: formule.id,
        //             nom: formule.nom,
        //             price: formuleData.prix,
        //         },
        //         productDetails,
        //         orderTime,
        //         userEmail,
        //         total,
        //         statut,
        //         type: 'MENU',
        //     });

        //     console.log('Order saved to Firebase');
        // } catch (error) {
        //     console.error('Error saving order to Firebase:', error);
        // }
    };

    const isFormuleComplete = () => {
        if (formule.nom === "Petit dej'" || formule.nom === "Maxi petit dej'") {
            const requiredSections = ["Choix boisson chaude", "Choix viennoiserie"];
            return requiredSections.every(section => items.some(item => item.section === section));
        } else if (formule.nom === "First" || formule.nom === "Maxi") {
            const requiredSections = ["Choix plat : ", "Choix Accompagnement 1 : ", "Choix Accompagnement 2 : "];
            return requiredSections.every(section => items.some(item => item.section === section));
        }
        return false;
    };

    const isButtonDisabled = loading || !user || !isFormuleComplete();

    console.log('loading:', loading);
    console.log('user:', user);
    console.log('isFormuleComplete:', isFormuleComplete());
    console.log('isButtonDisabled:', isButtonDisabled);

    return (
        <div className="mt-3 flex justify-end">
            <button 
                onClick={handleAddToCart} 
                disabled={isButtonDisabled} 
                className={`py-3 px-6 rounded-lg text-lg focus:outline-none ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
            >
                Ajouter au panier
            </button>
            {/* {showContent && (
                <div>
                    <p>ID: {formuleData.id}</p>
                    <p>Name: {formuleData.nom}</p>
                    <p>Price: {formuleData.prix}</p>
                </div>
            )} */}
        </div>
    );
};

export default ValiderBtn;
