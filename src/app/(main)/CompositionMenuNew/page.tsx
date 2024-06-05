"use client"
import React, { useState } from 'react';
import Header from '@/app/(main)/CompositionMenu/Components/header';
import ChoixFormule from '@/app/(main)/CompositionMenuNew/Components/choixFormule';
import ChoixItems from '@/app/(main)/CompositionMenuNew/Components/choixItems';
// import ValiderBtn from '@/app/(main)/CompositionMenuNew/Components/ValiderBtn';

const CompositionMenuNew = () => {
    const [formule, setFormule] = useState<string>('');
    const [items, setItems] = useState<string[]>([]);

    const handleFormuleChange = (newFormule: string) => {
        setFormule(newFormule);
        setItems([]); // Reset items when formule changes
    };

    const handleItemsChange = (newItems: string[]) => {
        setItems(newItems);
    };

    return (
        <div>
            <Header />
            <ChoixFormule onFormuleChange={handleFormuleChange} />
            <ChoixItems formule={formule} onItemsChange={handleItemsChange} />
            {/*<ValiderBtn formule={formule} items={items} />*/}
        </div>
    );
}

export default CompositionMenuNew;
