import React, { useState, useCallback } from 'react';
import Read from './Read';
import ChevronUp from '../../../../components/icons/chevron-up';
import ChevronDown from '../../../../components/icons/chevron-down';

interface ChoixItemsProps {
    formule: { id: string, nom: string };
    selectedItems: { id: string, nom: string, section: string }[];
    onItemsChange: (newItems: { id: string, nom: string, section: string }[]) => void;
}

const ChoixItems: React.FC<ChoixItemsProps> = ({ formule, selectedItems, onItemsChange }) => {
    const [isBoissonChaudeOpen, setIsBoissonChaudeOpen] = useState<boolean>(true);
    const [isViennoiserieOpen, setIsViennoiserieOpen] = useState<boolean>(true);
    const [isPlatOpen, setIsPlatOpen] = useState<boolean>(true);
    const [isAccompagnement1Open, setIsAccompagnement1Open] = useState<boolean>(true);
    const [isAccompagnement2Open, setIsAccompagnement2Open] = useState<boolean>(true);

    const handleItemChange = useCallback((item: { id: string, nom: string }, section: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        let newItems = [...selectedItems.filter(selectedItem => selectedItem.section !== section)];

        newItems.push({ ...item, section });

        onItemsChange(newItems);
        setOpen(false);  // Close the section when an item is selected
    }, [selectedItems, onItemsChange]);

    const toggle = useCallback((setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(state => !state);
    }, []);

    const sectionsPetitDej = [
        {
            name: "Choix boisson chaude",
            open: isBoissonChaudeOpen,
            setOpen: setIsBoissonChaudeOpen,
            typeProduit: ["boisson_chaude"],
        },
        {
            name: "Choix viennoiserie",
            open: isViennoiserieOpen,
            setOpen: setIsViennoiserieOpen,
            typeProduit: ["viennoiserie"],
        },
    ];

    const sectionsFirstMaxi = [
        {
            name: "Choix plat : ",
            open: isPlatOpen,
            setOpen: setIsPlatOpen,
            typeProduit: ["sandwich", "salade", "snacking"],
        },
        {
            name: "Choix Accompagnement 1 : ",
            open: isAccompagnement1Open,
            setOpen: setIsAccompagnement1Open,
            typeProduit: ["dessert", "entree", "boisson","boisson_froide","patisseries"],
        },
        {
            name: "Choix Accompagnement 2 : ",
            open: isAccompagnement2Open,
            setOpen: setIsAccompagnement2Open,
            typeProduit: ["dessert", "entree", "boisson","boisson_froide","patisseries"],
        },
    ];
    
    return (
        <div>
            {(formule.nom === "Petit dej'" || formule.nom === "Maxi petit dej'") && (
                <>
                    {sectionsPetitDej.map(({ name, open, setOpen, typeProduit }) => (
                        <div key={name} className="bg-red-100 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center w-full">
                                    <button onClick={() => toggle(setOpen)} className="focus:outline-none">
                                        {open ? <ChevronUp className="h-5 w-5 font-bold" /> : <ChevronDown className="h-5 w-5 font-bold" />}
                                    </button>
                                    <h2 className="ml-2">{name}</h2>
                                    <h2 className="align-left">
                                        {selectedItems.filter(item => item.section === name).map(item => (
                                            <span key={item.id} className="ml-2">{item.nom}</span>
                                        ))}
                                    </h2>
                                </div>
                            </div>
                            {open && (
                                <div className="flex flex-wrap">
                                    <Read
                                        databaseName="Produit"
                                        attributes={["nom", "imageUrl"]}
                                        filter={{ typeProduit, menu: formule.id }}
                                        onItemChange={(item) => handleItemChange(item, name, setOpen)}
                                        showItem={true}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
            {(formule.nom === "First" || formule.nom === "Maxi") && (
                <>
                    {sectionsFirstMaxi.map(({ name, open, setOpen, typeProduit }) => (
                        <div key={name} className="bg-red-100 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center w-full">
                                    <button onClick={() => toggle(setOpen)} className="focus:outline-none">
                                        {open ? <ChevronUp className="h-5 w-5 font-bold"/> : <ChevronDown className="h-5 w-5 font-bold"/>}
                                    </button>
                                    <h2 className="ml-2">{name}</h2>
                                    <h2 className="align-left">
                                        {selectedItems.filter(item => item.section === name).map(item => (
                                            <span key={item.id} className="ml-2">{item.nom}</span>
                                        ))}
                                    </h2>
                                </div>
                            </div>
                            {open && (
                                <div className="flex flex-wrap">
                                    <Read
                                        databaseName="Produit"
                                        attributes={["nom", "imageUrl"]}
                                        filter={{ typeProduit, menu: formule.id }}
                                        onItemChange={(item) => handleItemChange(item, name, setOpen)}
                                        showItem={true}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default ChoixItems;
