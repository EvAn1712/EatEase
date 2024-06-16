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

        // Formule ajoutée
        const item: Item = {
            OrderType: 'Menu',
            id: 1, // ou une autre valeur unique
            originalId: formule.id,
            name: formuleData.nom,
            price: formuleData.prix,
            quantity: 1,
            image: formuleData.imageUrl || '',
            description: `Composition: ${items.map(item => item.nom).join(', ')}`
        };

        addItemToCart(item, item.quantity);
        setShowContent(true);
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

    return (
        <div className="mt-3 flex justify-end">
            <button 
                onClick={handleAddToCart} 
                disabled={isButtonDisabled} 
                className={`py-3 px-6 rounded-lg text-lg focus:outline-none ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
            >
                Ajouter au panier
            </button>
        </div>
    );
};

export default ValiderBtn;
