import React, { useEffect, useState } from 'react';
import Read from './Read';
import ChevronUp from '../../../../components/icons/chevron-up';
import ChevronDown from '../../../../components/icons/chevron-down';

interface ChoixItemsProps {
    formule: { id: string, nom: string };
    selectedItems: { id: string, nom: string }[];
    onItemsChange: (newItems: { id: string, nom: string }[]) => void;
}

const ChoixItems: React.FC<ChoixItemsProps> = ({ formule, selectedItems, onItemsChange }) => {
    const [items, setItems] = useState<{ id: string, nom: string }[]>([]);
    const [isBoissonChaudeOpen, setIsBoissonChaudeOpen] = useState<boolean>(true);
    const [isViennoiserieOpen, setIsViennoiserieOpen] = useState<boolean>(true);
    const [isSandwichOpen, setIsSandwichOpen] = useState<boolean>(true);
    const [isDessertOpen, setIsDessertOpen] = useState<boolean>(true);

    useEffect(() => {
        setItems(selectedItems);
    }, [selectedItems]);

    const handleItemChange = (item: { id: string, nom: string }) => {
        const newItems = [...items, item];
        setItems(newItems);
        onItemsChange(newItems);
    };

    const toggleBoissonChaude = () => {
        setIsBoissonChaudeOpen(!isBoissonChaudeOpen);
    };

    const toggleViennoiserie = () => {
        setIsViennoiserieOpen(!isViennoiserieOpen);
    };

    const toggleSandwich = () => {
        setIsSandwichOpen(!isSandwichOpen);
    };

    const toggleDessert = () => {
        setIsDessertOpen(!isDessertOpen);
    };

    return (
        <div>
            {(formule.nom === "Petit dej'" || formule.nom === "Maxi petit dej'") && (
                <>
                    <div className="bg-red-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                            <button onClick={toggleBoissonChaude} className="focus:outline-none">
                                {isBoissonChaudeOpen ? <ChevronUp className="h-5 w-5 font-bold" /> : <ChevronDown className="h-5 w-5 font-bold" />}
                            </button>
                            <h2 className="ml-2">Choix boisson chaude:</h2>
                        </div>
                        {isBoissonChaudeOpen && (
                            <div className="flex flex-wrap">
                                <Read
                                    databaseName="Produit"
                                    attributes={["nom", "imageUrl"]}
                                    filter={{ typeProduit: ["boisson_chaude"], menu: formule.id }}
                                    onItemChange={handleItemChange}
                                    showItem={true}
                                />
                            </div>
                        )}
                    </div>
                    <div className="bg-red-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                            <button onClick={toggleViennoiserie} className="focus:outline-none">
                                {isViennoiserieOpen ? <ChevronUp className="h-5 w-5 font-bold" /> : <ChevronDown className="h-5 w-5 font-bold" />}
                            </button>
                            <h2 className="ml-2">Choix viennoiserie:</h2>
                        </div>
                        {isViennoiserieOpen && (
                            <div className="flex flex-wrap">
                                <Read
                                    databaseName="Produit"
                                    attributes={["nom", "imageUrl"]}
                                    filter={{ typeProduit: ["viennoiserie"], menu: formule.id }}
                                    onItemChange={handleItemChange}
                                    showItem={true}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
            {(formule.nom === "First" || formule.nom === "Maxi") && (
                <>
                    <div className="bg-red-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                            <button onClick={toggleSandwich} className="focus:outline-none">
                                {isSandwichOpen ? <ChevronUp className="h-5 w-5 font-bold" /> : <ChevronDown className="h-5 w-5 font-bold" />}
                            </button>
                            <h2 className="ml-2">Choix plat :</h2>
                        </div>
                        {isSandwichOpen && (
                            <div className="flex flex-wrap">
                                <Read
                                    databaseName="Produit"
                                    attributes={["nom", "imageUrl"]}
                                    filter={{ typeProduit: ["sandwich", "salade", "snacking"], menu: formule.id }}
                                    onItemChange={handleItemChange}
                                    showItem={true}
                                />
                            </div>
                        )}
                    </div>
                    <div className="bg-red-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                            <button onClick={toggleDessert} className="focus:outline-none">
                                {isDessertOpen ? <ChevronUp className="h-5 w-5 font-bold" /> : <ChevronDown className="h-5 w-5 font-bold" />}
                            </button>
                            <h2 className="ml-2">Choix Accompagnement 1:</h2>
                        </div>
                        {isDessertOpen && (
                            <div className="flex flex-wrap">
                                <Read
                                    databaseName="Produit"
                                    attributes={["nom", "imageUrl"]}
                                    filter={{ typeProduit: ["dessert", "entree", "boisson"], menu: formule.id }}
                                    onItemChange={handleItemChange}
                                    showItem={true}
                                />
                            </div>
                        )}
                    </div>
                    <div className="bg-red-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                            <button onClick={toggleDessert} className="focus:outline-none">
                                {isDessertOpen ? <ChevronUp className="h-5 w-5 font-bold" /> : <ChevronDown className="h-5 w-5 font-bold" />}
                            </button>
                            <h2 className="ml-2">Choix Accompagnement 2:</h2>
                        </div>
                        {isDessertOpen && (
                            <div className="flex flex-wrap">
                                <Read
                                    databaseName="Produit"
                                    attributes={["nom", "imageUrl"]}
                                    filter={{ typeProduit: ["dessert", "entree", "boisson"], menu: formule.id }}
                                    onItemChange={handleItemChange}
                                    showItem={true}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ChoixItems;
