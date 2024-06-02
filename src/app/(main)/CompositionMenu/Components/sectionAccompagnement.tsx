import React, { useState } from 'react';
import ReadByType from "./ReadByType";
import ReadAll from "@/app/(main)/Read/ReadAll";

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
            <div className="mt-4 flex flex-wrap space-x-4">
                {selectedCategory === "Dessert" && (
                    <div className="card p-4 w-64">
                        <ReadByType typesProduit={['dessert']} attributes={['nom', 'prix', 'imageUrl']}/>
                    </div>
                )}
                {selectedCategory === "Entree" && (
                    <div className="card p-4 w-64">
                        <ReadAll attributes={['nom', 'prix', 'imageUrl']}/>
                    </div>
                )}
                {selectedCategory === "Boisson" && (
                    <div className="card p-4 w-64">
                        <ReadByType typesProduit={['boisson']} attributes={['nom', 'imageUrl', 'allergenes']}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionAccompagnement;
