"use client"
import React, { useState } from 'react';
import Header from '@/app/(main)/CompositionMenu/Components/header';
import ChoixFormule from '@/app/(main)/CompositionMenuNew/Components/choixFormule';
// import ChoixItems from '@/app/(main)/CompositionMenuNew/Components/choixItems';
import ChoixItemTest from "@/app/(main)/CompositionMenuNew/Components/choixItemTest";

const CompositionMenuNew = () => {
    const [formule, setFormule] = useState<{ id: string, nom: string }>({ id: '', nom: '' });
    const [item, setItem] = useState<{ id: string, nom: string }>({ id: '', nom: '' });

    const handleFormuleChange = (newFormule: { id: string, nom: string }) => {
        setFormule(newFormule);
        setItem({ id: '', nom: '' }); // Reset item when formule changes
    };

    const handleItemChange = (newItem: { id: string, nom: string }) => {
        setItem(newItem);
    };

    return (
        <div>
            <Header />
            <ChoixFormule onFormuleChange={handleFormuleChange} />
            <ChoixItemTest formule={formule} selectedItem={item} onItemChange={handleItemChange} />
            {/*<ChoixItems formule={formule} />*/}
        </div>
    );
}

export default CompositionMenuNew;
