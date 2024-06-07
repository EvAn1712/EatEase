"use client"
import React, { useState } from 'react';
import Header from '@/app/(main)/CompositionMenuNew/Components/header';
import ChoixFormule from '@/app/(main)/CompositionMenuNew/Components/choixFormule';
import ChoixItems from '@/app/(main)/CompositionMenuNew/Components/choixItems';

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
        <div>
            <Header />
            <ChoixFormule onFormuleChange={handleFormuleChange} />
            <ChoixItems formule={formule} selectedItems={items} onItemsChange={handleItemsChange} />

            {/* Division to show raw data */}
            <div>
                <h2>Raw Data: affichage temporaire</h2>
                <ul>
                    {/* Render formule */}
                    <li>Formule id : {formule.id} Formule nom: {formule.nom}</li>
                    {/* Render items */}
                    {items.map(item => (
                        <li key={item.id}>Item id: {item.id} Item nom: {item.nom}, Section: {item.section}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CompositionMenuNew;
