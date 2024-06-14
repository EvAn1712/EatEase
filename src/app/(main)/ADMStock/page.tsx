"use client";
import React, { useState, useEffect } from 'react';
import PageHeader from '@/app/shared/page-header';
import app from "../firebase-config";
import { getDatabase, ref, get, push, set, query, orderByKey, limitToLast } from "firebase/database";
import {useAdminCheck} from "@/app/(main)/authContext";

interface ICommande {
    produitId: string;
    quantite: string;
    [key: string]: string;
}

const PasserCommande: React.FC = () => {
    const [commande, setCommande] = useState<ICommande[]>([{ produitId: '', quantite: '' }]);
    const [produitArray, setProduitArray] = useState<any>({});

    const fetchData = async () => {
        try {
            const db = getDatabase(app);
            const dbRef = ref(db, "Produit");
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setProduitArray(snapshot.val());
            } else {
                alert("No data available");
            }
        } catch (error) {
            console.error("Error reading data:", error);
        }
    };

    const fetchLastCommande = async () => {
        try {
            const db = getDatabase(app);
            const commandesRef = ref(db, "ADMCommande");
            const lastCommandeQuery = query(commandesRef, orderByKey(), limitToLast(1));
            const snapshot = await get(lastCommandeQuery);
            if (snapshot.exists()) {
                const lastCommande = snapshot.val();
                const lastCommandeKey = Object.keys(lastCommande)[0];
                setCommande(lastCommande[lastCommandeKey].produits);
            } else {
                alert("No previous orders available");
            }
        } catch (error) {
            console.error("Error fetching last order:", error);
        }
    };

    const addCommande = async () => {
        const db = getDatabase(app);
        const commandeRef = ref(db, "ADMCommande");
        const newCommandeRef = push(commandeRef);
        await set(newCommandeRef, {
            produits: commande,
            date: new Date().toISOString(),
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (index: number, field: keyof ICommande, value: string) => {
        const newCommande = [...commande];
        newCommande[index][field] = value;
        setCommande(newCommande);
    };

    const handleAddProduct = () => {
        setCommande([...commande, { produitId: '', quantite: '' }]);
    };

    const handleRemoveProduct = (index: number) => {
        const newCommande = commande.filter((_, i) => i !== index);
        setCommande(newCommande);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const db = getDatabase(app);
            for (const item of commande) {
                const produitRef = ref(db, `Produit/${item.produitId}`);
                const produitSnapshot = await get(produitRef);
                if (produitSnapshot.exists()) {
                    const produitData = produitSnapshot.val();
                    const quantiteCommandee = parseInt(item.quantite);
                    if (!isNaN(quantiteCommandee) && quantiteCommandee >= 0) {
                        const nouveauStock = produitData.stock + quantiteCommandee;
                        await set(produitRef, { ...produitData, stock: nouveauStock });
                    } else {
                        console.error(`Invalid quantity for product ${item.produitId}`);
                    }
                } else {
                    console.error(`Product ${item.produitId} not found`);
                }
            }
            await addCommande();
            console.log('Commande soumise:', { commande });
            setCommande([{ produitId: '', quantite: '' }]);
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };

    const pageHeader = {
        title: 'Passer une Commande',
        breadcrumb: [],
    };

    if (!useAdminCheck()) {
        return (
            <div className="mt-4 pb-3 3xl:mt-6 text-center">
                <p className="text-gray-700 font-bold">Veuillez vous connecter en tant qu'admin pour accéder au contenu.</p>
                <div className="flex justify-center mt-4">
                    <a
                        href="/point-of-sale"
                        onClick={() => {
                            window.location.href = '/point-of-sale';
                        }}
                        className="border border-bg-primary text-bg-primary px-4 py-2 mr-4 rounded-md hover:bg-primary hover:text-white focus:outline-none focus:bg-primary focus:text-white"
                    >
                        Accueil
                    </a>
                </div>
            </div>
        );
    }
    

    return (
        <div className="w-80 mx-auto py-8">
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} className="[&_h2]:font-lexend [&_h2]:font-bold" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {commande.map((item, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col flex-1">
                                <label htmlFor={`produit-${index}`} className="text-lg font-bold">Produit:</label>
                                <select
                                    id={`produit-${index}`}
                                    value={item.produitId}
                                    onChange={(e) => handleChange(index, 'produitId', e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                >
                                    <option value="" disabled>Sélectionnez un produit</option>
                                    {produitArray && Object.keys(produitArray).map((key) => (
                                        <option key={key} value={key}>
                                            {produitArray[key].nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor={`quantite-${index}`} className="text-lg font-bold">Quantité:</label>
                                <input
                                    type="number"
                                    id={`quantite-${index}`}
                                    value={item.quantite}
                                    onChange={(e) => handleChange(index, 'quantite', e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveProduct(index)}
                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                                Retirer
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddProduct}
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                    Ajouter un Produit en plus
                </button>
                <button
                    type="button"
                    onClick={fetchLastCommande}
                    className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                >
                    Dernière commande
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Passer la Commande
                </button>
            </form>
        </div>
    );
};

export default PasserCommande;
