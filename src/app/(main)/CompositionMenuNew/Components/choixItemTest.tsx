import React, { useState, useEffect } from 'react';
import Read from './Read'; // Assurez-vous que le chemin vers le composant Read est correct
import ChevronUp from '../../../../components/icons/chevron-up';
import ChevronDown from '../../../../components/icons/chevron-down';

interface ChoixItemTestProps {
    formule: { id: string, nom: string };
    selectedItem: { id: string, nom: string };
    onItemChange: (item: { id: string, nom: string }) => void;
}

const ChoixItemTest: React.FC<ChoixItemTestProps> = ({ formule, selectedItem, onItemChange }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        // Effect to update items when formule or selectedItem changes
        const updatedItems = formule ? [`${formule.nom}-${selectedItem.nom}`] : [];
        setItems(updatedItems);
    }, [formule, selectedItem]);

    const handleMenuDataChange = (item: { id: string, nom: string }) => {
        onItemChange(item);
    };

    const toggleBanner = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-red-100 rounded-lg p-4 mb-4">
            <div className="flex items-center">
                <button onClick={toggleBanner} className="focus:outline-none">
                    {isOpen ? <ChevronUp className="h-5 w-5 font-bold" /> : <ChevronDown className="h-5 w-5 font-bold" />}
                </button>
                <h2 className="ml-2">Choisissez une formule: {selectedItem.nom}</h2>
            </div>
            {isOpen && (
                <Read
                    databaseName="Produit"
                    attributes={["nom", "prix", "imageUrl"]}
                    filter={{ typeProduit: "boisson_chaude", menu: "-Ny4dSqlcGVqVNEYMdkb" }}
                    onItemChange={handleMenuDataChange}
                    showItem={true}
                    selectedItem={selectedItem ? { id: selectedItem.id, nom: selectedItem.nom, prix: 0 } : undefined}
                />
            )}
            {/* Add a div to print the props */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Props:</h3>
                <pre>{JSON.stringify({ formule, selectedItem }, null, 2)}</pre>
            </div>
        </div>
    );
};

export default ChoixItemTest;
