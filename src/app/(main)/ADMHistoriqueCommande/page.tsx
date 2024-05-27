import React from 'react';
import PageHeader from '@/app/shared/page-header';

const CommandesEnCours: React.FC = () => {
    const commandesEnCours = [
        { id: 1, nom: "Étudiant 1", contenu: "Livre de mathématiques", prix: 50, heure: "14:00" },
        { id: 2, nom: "Étudiant 2", contenu: "Cahier de sciences", prix: 70, heure: "15:30" },
        { id: 3, nom: "Étudiant 3", contenu: "Stylos", prix: 100, heure: "16:45" },
    ];

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