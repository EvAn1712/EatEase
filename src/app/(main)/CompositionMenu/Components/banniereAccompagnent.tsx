import React, { useState } from 'react';
import ReadByType from "@/app/(main)/Read/ReadByType";
import SectionAccompagnement from "@/app/(main)/CompositionMenu/Components/sectionAccompagnement";

interface BanniereAccompagnementProps {
    onAccompagnementChange: (value: string) => void;
}

const BanniereAccompagnement: React.FC<BanniereAccompagnementProps> = ({ onAccompagnementChange }) => {
    const [showAccompagnement, setShowAccompagnement] = useState(false);
    const [accompagnement, setAccompagnement] = useState('');

    const toggleAccompagnement = () => {
        setShowAccompagnement(!showAccompagnement);
    };

    const handleAccompagnementChange = (accompagnement: string) => {
        setAccompagnement(accompagnement);
        onAccompagnementChange(accompagnement);
    };

    return (
        <div className="rectangular-section bg-gray-200 p-4 rounded-md shadow-md">
            <div className="flex items-center">
                <button
                    onClick={toggleAccompagnement}
                    className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-500"
                >
                    {showAccompagnement ? 'Fermer' : 'Ouvrir'}
                </button>
                <p className="ml-2 text-sm font-semibold text-gray-700">Choix Accompagnement 1: {accompagnement}</p>
            </div>
            {showAccompagnement && <SectionAccompagnement onAccompagnementChange={handleAccompagnementChange} />}
        </div>
    );
};

export default BanniereAccompagnement;
