import React, { useState } from 'react';
import ReadByType from "./ReadByType";
import ReadAll from "@/app/(main)/Read/ReadAll";

// Reusable button component
const CategoryButton: React.FC<{ category: string, onClick: (category: string) => void }> = ({ category, onClick }) => (
    <button
        onClick={() => onClick(category)}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2 mb-2"
        style={{ marginTop: '10px' }} // Add margin above each button
    >
        {category}
    </button>
);

const SectionAccompagnement: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const categories = [
        { name: "Entree", type: 'entree' },
        { name: "Dessert", type: 'dessert' },
        { name: "Boisson", type: 'boisson' }
    ];

    return (
        <div style={{ marginTop: '15px'}}>
            {categories.map(({ name }) => (
                <CategoryButton key={name} category={name} onClick={handleCategoryClick} />
            ))}
            <div style={{ width: '100%' }}>
                {categories.map(({ name, type }) => (
                    selectedCategory === name && (
                        <div key={type} className="card p-4">
                            <ReadByType typesProduit={[type]} attributes={['nom', 'imageUrl']} />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default SectionAccompagnement;
