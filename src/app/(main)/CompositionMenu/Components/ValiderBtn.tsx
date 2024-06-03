"use client";
import React from 'react';

interface ValiderBtnProps {
    updateMenu: () => void;
}

const ValiderBtn: React.FC<ValiderBtnProps> = ({ updateMenu }) => {

    const handleSubmit = () => {
        updateMenu();
    };

    return (
        <button onClick={handleSubmit}
                className="px-6 py-2 bg-red-700 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500 mt-4">
            Valider
        </button>
    );
};

export default ValiderBtn;
