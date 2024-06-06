"use client";
import React, { useState } from 'react';
import Header from '@/app/(main)/CompositionMenu/Components/header';
import ChoixFormule from '@/app/(main)/CompositionMenuNew/Components/choixFormule';
import ChoixItems from '@/app/(main)/CompositionMenuNew/Components/choixItems';
// import ChoixItemTest from "@/app/(main)/CompositionMenuNew/Components/choixItemTest";

const CompositionMenuNew = () => {
    const [formule, setFormule] = useState<{ id: string, nom: string }>({ id: '', nom: '' });
    const [items, setItems] = useState<{ id: string, nom: string }[]>([]);

    const handleFormuleChange = (newFormule: { id: string, nom: string }) => {
        setFormule(newFormule);
        setItems([]); // Reset items when formule changes
    };

    const handleItemsChange = (newItems: { id: string, nom: string }[]) => {
        setItems(newItems);
    };

    return (
        <div>
            <Header />
            <ChoixFormule onFormuleChange={handleFormuleChange} />
            {/* <ChoixItemTest formule={formule} selectedItems={items} onItemsChange={handleItemsChange} /> */}
            <ChoixItems formule={formule} selectedItems={items} onItemsChange={handleItemsChange} />
        </div>
    );
};

export default CompositionMenuNew;
