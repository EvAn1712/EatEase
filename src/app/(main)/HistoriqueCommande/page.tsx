'use client';

import React, { useEffect, useState } from 'react';
import PageHeader from '@/app/shared/page-header';
import app from "@/app/(main)/firebase-config";
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Historique: React.FC = () => {
    const [commandes, setCommandes] = useState<any[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchCommandes = async () => {
            const auth = getAuth(app);
            const user = auth.currentUser;

            if (user) {
                setUserEmail(user.email);

                const db = getDatabase(app);
                const commandesRef = ref(db, 'CLICommande');
                const snapshot = await get(commandesRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const commandesArray = Object.keys(data)
                        .map(key => ({
                            id: key,
                            ...data[key],
                        }))
                        .filter(commande => commande.userEmail === user.email);

                    commandesArray.sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime());
                    setCommandes(commandesArray);
                } else {
                    console.log("No data available");
                }
            } else {
                console.log("User not logged in");
            }
        };

        fetchCommandes();
    }, []);

    const pageHeader = {
        title: 'Historique de commande',
        breadcrumb: [],
        className: "[&_h2]:font-lexend [&_h2]:font-bold text-3xl",
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
                        <div key={commande.id} className="block border-b border-gray-300 py-6 px-8 text-lg">
                            <div className="flex justify-between">
                                <h5 className="font-bold text-xl">
                                    Commande passée le {new Date(commande.orderTime).toLocaleDateString()} à {new Date(commande.orderTime).toLocaleTimeString()}
                                </h5>
                                <div className="text-right">
                                    <small className={`text-xl block ${!commande.statut ? 'text-red-600' : 'text-green-600'}`}>
                                        {commande.statut ? 'Reçue' : 'En cours'}
                                    </small>
                                    {commande.type === 'MENU' ? 'MENU' : 'SIMPLE'}
                                    <span className="text-2xl font-bold  block mt-2">€{commande.total}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-xl">
                                    Produits: {commande.productDetails.map((product: any) => `${product.name} (x${product.quantity})`).join(', ')}
                                </p>
                                {commande.type === 'MENU' && commande.formule && (
                                    <div className="mt-2">
                                        <h6 className="font-bold">Formule: {commande.formule.nom}</h6>
                                        <p className="text-lg">Prix: €{commande.formule.price}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="py-6 px-8 text-lg">Vous n'avez jamais passé commande</p>
                )}
            </div>
        </div>
    );
}

export default Historique;
