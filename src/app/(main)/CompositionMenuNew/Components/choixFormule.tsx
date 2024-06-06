import React, { useState } from 'react';
import Read from './Read'; // Make sure the path to the Read component is correct
import ChevronUp from '../../../../components/icons/chevron-up';
import ChevronDown from '../../../../components/icons/chevron-down';

interface ChoixFormuleProps {
    onFormuleChange: (formule: { id: string, nom: string }) => void;
}

const ChoixFormule: React.FC<ChoixFormuleProps> = ({ onFormuleChange }) => {
    const [formule, setFormule] = useState<{ id: string, nom: string }>({ id: '', nom: '' });
    const [menuItems, setMenuItems] = useState<{ id: string, nom: string, prix: number }[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleMenuDataChange = (item: { id: string, nom: string }) => {
        setFormule(item);
        onFormuleChange(item);
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
                <h2 className="ml-2">Choisissez une formule: {formule.nom}</h2>
            </div>
            {isOpen && (
                <Read
                    databaseName="Menu"
                    attributes={['nom', 'prix']}
                    filter={{ typeProduit: "none", menu: "none" }}
                    onItemChange={handleMenuDataChange}
                    showItem={true}
                />
            )}
        </div>
    );
};

export default ChoixFormule;
