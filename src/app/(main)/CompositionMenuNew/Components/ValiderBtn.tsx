"use client"
import React from 'react';
import { useRouter } from 'next/router';

interface ValiderBtnProps {
    formule: string;
    items: string[];
}

const ValiderBtn: React.FC<ValiderBtnProps> = ({ formule, items }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push({
            pathname: '/result',
            query: { formule, items: JSON.stringify(items) }
        });
    };

    return (
        <button onClick={handleClick}>
            Valider
        </button>
    );
};

export default ValiderBtn;
