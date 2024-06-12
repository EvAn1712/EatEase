'use client';
import React, { useEffect, useState } from 'react';
import PageHeader from '@/app/shared/page-header';
import { useAdminCheck } from "@/app/(main)/authContext";
import { getDatabase, ref, get, update } from "firebase/database";

const CommandesEnCours: React.FC = () => {
    const [commandesEnCours, setCommandesEnCours] = useState<any[]>([]);

    useEffect(() => {
        const fetchCommandes = async () => {
            const db = getDatabase();
            const commandesRef = ref(db, 'CLICommande');
            const snapshot = await get(commandesRef);

            if (snapshot.exists()) {
                const commandesData = snapshot.val();
                const commandesList = Object.keys(commandesData)
                    .map(key => ({
                        id: key,
                        ...commandesData[key]
                    }))
                    .filter(commande => {
                        const commandeDate = new Date(commande.orderTime);
                        const today = new Date();
                        return commandeDate.getDate() === today.getDate() &&
                            commandeDate.getMonth() === today.getMonth() &&
                            commandeDate.getFullYear() === today.getFullYear() &&
                            commande.statut === false; // false signifies "in progress"
                    });
                setCommandesEnCours(commandesList);
            } else {
                console.log('No data available');
            }
        };

        fetchCommandes();
    }, []);

    const handleEffectuerClick = async (id: string) => {
        const db = getDatabase();
        const commandesRef = ref(db, `CLICommande/${id}`);

        await update(commandesRef, { statut: true }); // Update the status in the database

        setCommandesEnCours(prevCommandes =>
            prevCommandes.filter(commande => commande.id !== id) // Remove the command from state
        );
    };

    if (!useAdminCheck()) {
        return (
            <div className="mt-4 pb-3 3xl:mt-6 text-center">
                <p className="text-gray-700 font-bold">Veuillez vous connecter en tant qu'admin pour accéder au contenu.</p>
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
                        <p className="text-gray-700">{new Date(commande.orderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}</p>
                        <p className="text-gray-700">Détails du produit:</p>
                        <ul className="mb-4">
                            {commande.productDetails.map((product: any, index: number) => (
                                <li key={index}>{product.quantity} {product.name}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleEffectuerClick(commande.id)}
                            className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        >
                            Valider
                        </button>
                        <p className="text-gray-700 font-bold">Total: {commande.total} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommandesEnCours;
