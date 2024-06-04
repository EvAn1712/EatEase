"use client"
import React from 'react';
import ReadById from "@/app/(main)/Read/ReadById";

interface Props {
    plat: string;
}

const TexteExplicatif: React.FC<Props> = ({ plat }) => {
    return (
        <div className="text-lg mb-4 text-center">
            Vous allez composer votre menu avec <ReadById productId={plat} attributes={['typeProduit','nom']}/> et 2 accompagnements
        </div>

    );
};

export default TexteExplicatif;
