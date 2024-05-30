"use client"
import React, { useState } from 'react';
import ReadByType from "@/app/(main)/Read/ReadByType";

const SectionAccompagnement: React.FC = () => {

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <button onClick={() => handleCategoryClick("Entree")} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2">Entree</button>
            <button onClick={() => handleCategoryClick("Dessert")} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2">Dessert</button>
            <button onClick={() => handleCategoryClick("Boisson")} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2">Boisson</button>
            {selectedCategory === "Dessert" && (
                <div className="mt-4">
                    <ReadByType typesProduit={['dessert']} attributes={['nom', 'prix', 'imageUrl']}/>
                </div>
            )}
            {selectedCategory === "Entree" && (
                <div className="mt-4">
                    <ReadByType typesProduit={['entree']} attributes={['nom', 'prix', 'imageUrl']}/>
                </div>
            )}
            {selectedCategory === "Boisson" && (
                <div className="mt-4">
                    <ReadByType typesProduit={['boisson']} attributes={['nom', 'prix', 'imageUrl']}/>
                </div>
            )}
        </div>
    );
};

export default SectionAccompagnement;
