'use client';
import React, { useState } from 'react';
import Header from '@/app/(main)/CompositionMenuNew/Components/header';
import ChoixFormule from '@/app/(main)/CompositionMenuNew/Components/choixFormule';
import ChoixItems from '@/app/(main)/CompositionMenuNew/Components/choixItems';
import { POS_CART_KEY } from "@/config/constants";
import { CartProvider } from "@/store/quick-cart/cart.context";
import POSDrawer from "@/app/shared/point-of-sale/pos-drawer";
import ValiderBtn from '@/app/(main)/CompositionMenuNew/Components/ValiderBtn';

const CompositionMenuNew = () => {
    const [formule, setFormule] = useState<{ id: string, nom: string }>({ id: '', nom: '' });
    const [items, setItems] = useState<{ id: string, nom: string, section: string }[]>([]);

    const handleFormuleChange = (newFormule: { id: string, nom: string }) => {
        setFormule(newFormule);
        setItems([]);
    };

    const handleItemsChange = (newItems: { id: string, nom: string, section: string }[]) => {
        setItems(newItems);
    };

    return (
        <CartProvider cartKey={POS_CART_KEY}>
            <div>
                <Header />
                <ChoixFormule onFormuleChange={handleFormuleChange} />
                <ChoixItems formule={formule} selectedItems={items} onItemsChange={handleItemsChange} />
                <ValiderBtn formule={formule} items={items} />

                {/* Division to show raw data */}
                {/* <div>
                    <h2>Raw Data: affichage temporaire</h2>
                    <ul>
                        {/* Render formule */}
                        {/*<li>Formule id : {formule.id} Formule nom: {formule.nom}</li>
                        {/* Render items */}
                        {/*{items.map(item => (
                            <li key={item.id}>Item id: {item.id} Item nom: {item.nom}, Section: {item.section}</li>
                        ))}
                    </ul>
                </div>*/}
                <POSDrawer />
            </div>
        </CartProvider>
    );
};

export default CompositionMenuNew;
