"use client"
import React, { useState } from 'react';

const ValiderBtn: React.FC = () => {

    const [menu, setMenu] = useState('');
    const [plat, setPlat] = useState('');
    const [accompagnement1, setAccompagnement1] = useState('');
    const [accompagnement2, setAccompagnement2] = useState('');

    const handleSubmit = () => {
        // Envoyer les variables à un serveur ou les afficher dans la console
        console.log({menu, plat, accompagnement1, accompagnement2});
    };

    return (
        <button onClick={handleSubmit} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4">
            Valider
        </button>
    );
};

export default ValiderBtn;
