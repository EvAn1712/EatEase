import React from 'react';
import PageHeader from '@/app/shared/page-header';

const Historique: React.FC = () => {
    const commandes = [
        { id: 1, nom: 'Commande 1', contenu: 'Contenu de la commande 1', prix: '10€', date: '2024-03-30' },
        { id: 2, nom: 'Commande 2', contenu: 'Contenu de la commande 2', prix: '15€', date: '2024-03-25' },
        { id: 3, nom: 'Commande 3', contenu: 'Contenu de la commande 3', prix: '20€', date: '2024-03-20' }
    ];

    const pageHeader = {
        title: 'Historique de commande',
        breadcrumb: [],
        className: "[&_h2]:font-lexend [&_h2]:font-bold",
    };

    return (
        <div className="w-4/5 mx-auto py-8">
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
                className={pageHeader.className}
            />
            <div className="border border-gray-300 rounded-md">
                {commandes.length !== 0 ? (
                    commandes.map(commande => (
                        <a key={commande.id} href="#" className="block border-b border-gray-300 py-4 px-6">
                            <div className="flex justify-between">
                                <h5 className="font-bold">{commande.nom}</h5>
                                <small className="text-gray-600">{commande.date}</small>
                            </div>
                            <div className="mt-2">
                                <p>{commande.contenu}</p>
                                <small className="text-gray-600">Prix: {commande.prix}</small>
                            </div>
                        </a>
                    ))
                ) : (
                    <p className="py-4 px-6">Vous n'avez jamais passé commande</p>
                )}
            </div>
        </div>
    );
}

export default Historique;