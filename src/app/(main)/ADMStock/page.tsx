"use client";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PageHeader from '@/app/shared/page-header';
import app from "../firebase-config";
import { getDatabase, ref, get, push, set, query, orderByKey, limitToLast } from "firebase/database";
import { useAdminCheck } from "@/app/(main)/authContext";

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
            let notificationMessages: string[] = [];
            let allProductsUpdated = false;

            for (const item of commande) {
                if (item.produitId === "tout") {
                    allProductsUpdated = true;
                    const produitRefs = ref(db, "Produit");
                    const produitSnapshots = await get(produitRefs);
                    if (produitSnapshots.exists()) {
                        const produits = produitSnapshots.val();
                        const quantiteCommandee = parseInt(item.quantite);
                        if (!isNaN(quantiteCommandee) && quantiteCommandee) {
                            for (const key in produits) {
                                const produitData = produits[key];
                                const nouveauStock = produitData.stock + quantiteCommandee;
                                await set(ref(db, `Produit/${key}`), { ...produitData, stock: nouveauStock });
                            }
                            notificationMessages.push(`Vous avez bien ajouté ${quantiteCommandee} unités à tous les produits`);
                        } else {
                            console.error(`Invalid quantity for all products`);
                        }
                    }
                } else {
                    const produitRef = ref(db, `Produit/${item.produitId}`);
                    const produitSnapshot = await get(produitRef);
                    if (produitSnapshot.exists()) {
                        const produitData = produitSnapshot.val();
                        const quantiteCommandee = parseInt(item.quantite);
                        if (!isNaN(quantiteCommandee) && quantiteCommandee) {
                            const nouveauStock = produitData.stock + quantiteCommandee;
                            await set(produitRef, { ...produitData, stock: nouveauStock });
                            notificationMessages.push(`Vous avez bien ajouté ${quantiteCommandee} ${produitData.nom}`);
                        } else {
                            console.error(`Invalid quantity for product ${item.produitId}`);
                        }
                    } else {
                        console.error(`Product ${item.produitId} not found`);
                    }
                }
            }

            await addCommande();
            notificationMessages.forEach(message => toast.success(message));
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
        <div className="w-full max-w-lg mx-auto py-8">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4">Liste des produits</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {commande.map((item, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="flex-1">
                                <label htmlFor={`produit-${index}`} className="text-lg font-bold">Produit:</label>
                                <select
                                    id={`produit-${index}`}
                                    value={item.produitId}
                                    onChange={(e) => handleChange(index, 'produitId', e.target.value)}
                                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                >
                                    <option value="" disabled>Sélectionnez un produit</option>
                                    <option value="tout">Tous les produits</option>
                                    {produitArray && Object.keys(produitArray).map((key) => (
                                        <option key={key} value={key}>
                                            {produitArray[key].nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 mt-4 md:mt-0 md:ml-4">
                                <label htmlFor={`quantite-${index}`} className="text-lg font-bold">Quantité:</label>
                                <input
                                    type="number"
                                    id={`quantite-${index}`}
                                    value={item.quantite}
                                    onChange={(e) => handleChange(index, 'quantite', e.target.value)}
                                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 md:justify-start">
                            <button
                                type="button"
                                onClick={() => handleRemoveProduct(index)}
                                className="px-3 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                                Retirer
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    >
                        Ajouter un Produit en plus
                    </button>
                    <button
                        type="button"
                        onClick={fetchLastCommande}
                        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                    >
                        Dernière commande
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Passer la Commande
                </button>
            </form>
        </div>
    );
};

export default PasserCommande;
