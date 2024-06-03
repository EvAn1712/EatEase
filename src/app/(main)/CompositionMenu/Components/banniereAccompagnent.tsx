import React, { useState } from 'react';
import ReadByType from "@/app/(main)/Read/ReadByType";
import SectionAccompagnement from "@/app/(main)/CompositionMenu/Components/sectionAccompagnement";

interface BanniereAccompagnementProps {}

const BanniereAccompagnement: React.FC<BanniereAccompagnementProps> = () => {
    const [showAccompagnement, setShowAccompagnement] = useState(false);
    const toggleAccompagnement = () => {
        setShowAccompagnement(!showAccompagnement);
    };

    return (
        <div className="rectangular-section bg-gray-200 p-4 rounded-md shadow-md">
            <div>
                <button onClick={toggleAccompagnement}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    {showAccompagnement ? 'Fermer' : 'Ouvrir'} choix Accompagnement 1
                </button>
            </div>
            {showAccompagnement && <SectionAccompagnement />}
        </div>
    );
};

export default BanniereAccompagnement;
