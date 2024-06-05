"use client"
import React, { useState, useEffect } from 'react';

interface ChoixItemsProps {
    formule: string;
    onItemsChange: (newItems: string[]) => void;
}

const ChoixItems: React.FC<ChoixItemsProps> = ({ formule, onItemsChange }) => {
    const [items, setItems] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>('');

    useEffect(() => {
        if (formule) {
            // Logique pour récupérer les items en fonction de la formule
            setItems(['item1', 'item2', 'item3']); // Exemple d'items
        } else {
            setItems([]);
        }
    }, [formule]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newItem = event.target.value;
        setSelectedItem(newItem);
        onItemsChange([newItem]);
    };

    return (
        <div>
            <label htmlFor="item">Choisissez un item:</label>
            <select id="item" value={selectedItem} onChange={handleChange}>
                <option value="">Sélectionner</option>
                {items.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default ChoixItems;
