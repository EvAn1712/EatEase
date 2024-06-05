"use client"
import React, { useState } from 'react';

interface ChoixFormuleProps {
    onFormuleChange: (newFormule: string) => void;
}

const ChoixFormule: React.FC<ChoixFormuleProps> = ({ onFormuleChange }) => {
    const [formule, setFormule] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newFormule = event.target.value;
        setFormule(newFormule);
        onFormuleChange(newFormule);
    };

    return (
        <div>
            <label htmlFor="formule">Choisissez une formule:</label>
            <select id="formule" value={formule} onChange={handleChange}>
                <option value="">Sélectionner</option>
                <option value="formule1">Formule 1</option>
                <option value="formule2">Formule 2</option>
                {/* Ajoutez plus d'options selon vos besoins */}
            </select>
        </div>
    );
};

export default ChoixFormule;
