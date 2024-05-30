import React, { useState, useEffect } from 'react';
import app from "../firebase-config";
import { getDatabase, ref, get } from "firebase/database";

interface Product {
    nom?: string;
    prix?: number;
    description?: string;
    listIdAllergenes?: string[];
    typeProduit?: string;
    listIdMenu?: string[];
    imageUrl?: string; // new attribute
}

interface Props {
    attributes: string[];
}

function ReadAll({ attributes }: Props) {
    const [produitArray, setproduitArray] = useState<any>({});

    const fetchData = async () => {
        try {
            const db = getDatabase(app);
            const dbRef = ref(db, "Produit");
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setproduitArray(snapshot.val());
            } else {
                alert("No data available");
            }
        } catch (error) {
            console.error("Error reading data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Liste des produits</h1> {/* added h1 tag from second version */}
            <ul>
                {produitArray && Object.keys(produitArray).map((key) => {
                    const product = produitArray[key] as Product;
                    return (
                        <li key={key}>
                            {attributes.includes('nom') && product.nom && <p>{product.nom}</p>}
                            {attributes.includes('prix') && product.prix !== undefined && product.prix !== null && <p>{product.prix} €</p>}
                            {attributes.includes('description') && product.description && <p>{product.description}</p>}
                            {attributes.includes('listIdAllergenes') && product.listIdAllergenes && <p>Allergènes: {product.listIdAllergenes.join(', ')}</p>}
                            {attributes.includes('typeProduit') && product.typeProduit && <p>Type de produit: {product.typeProduit}</p>}
                            {attributes.includes('listIdMenu') && product.listIdMenu && <p>Menus: {product.listIdMenu.join(', ')}</p>}
                            {attributes.includes('imageUrl') && product.imageUrl && <img src={product.imageUrl} alt={product.nom} width="100" height="100" />} {/* new image tag with conditional rendering */}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default ReadAll;
