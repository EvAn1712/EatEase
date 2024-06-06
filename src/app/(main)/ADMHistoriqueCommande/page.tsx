'use client';
import React from 'react';
import PageHeader from '@/app/shared/page-header';
import {useAdminCheck} from "@/app/(main)/authContext";

const CommandesEnCours: React.FC = () => {
    const commandesEnCours = [
        { id: 1, nom: "Étudiant 1", contenu: "Livre de mathématiques", prix: 50, heure: "14:00" },
        { id: 2, nom: "Étudiant 2", contenu: "Cahier de sciences", prix: 70, heure: "15:30" },
        { id: 3, nom: "Étudiant 3", contenu: "Stylos", prix: 100, heure: "16:45" },
    ];

    if (!useAdminCheck()) {
        return(
            <div className="mt-4 pb-3 3xl:mt-6 text-center">
                <p className="text-gray-700 font-bold">Veuillez vous connecter en tant qu'admin pour accéder au
                    contenu.</p>
                <div className="flex justify-center mt-4">
                    <a href="/point-of-sale" onClick={() => {
                        window.location.href = '/point-of-sale';
                    }}
                       className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Accueil
                    </a>
                </div>
            </div>
        );
    }
    return (
        <div className="container mx-auto px-4 py-5">
            <PageHeader
                title="Commandes en Cours"
                breadcrumb={[]}
                className="[&_h2]:font-lexend [&_h2]:font-bold"
            />
            <div className="flex overflow-x-auto mt-5 gap-4">
                {commandesEnCours.map(commande => (
                    <div key={commande.id} className="flex flex-col items-center justify-center bg-gray-200 p-4 shadow-lg rounded-lg w-64">
                        <h2 className="font-bold text-lg">Commande {commande.id}</h2>
                        <p className="text-gray-700">Nom: {commande.nom}</p>
                        <p className="text-gray-700">Contenu: {commande.contenu}</p>
                        <p className="text-gray-700">Prix: {commande.prix} €</p>
                        <p className="text-gray-700">Heure: {commande.heure}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommandesEnCours;