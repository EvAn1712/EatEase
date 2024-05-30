import React, { useEffect, useState } from 'react';
import app from "../firebase-config";
import { getDatabase, ref, get } from "firebase/database";

interface Product {
    nom?: string;
    prix?: number;
    description?: string;
    listIdAllergenes?: string[];
    typeProduit?: string;
    listIdMenu?: string[];
}

interface Props {
    typesProduit: string[];
    attributes: string[];
}

function ReadByType({ typesProduit, attributes }: Props) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase(app);
                const dbRef = ref(db, "Produit");
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const allProducts: Product[] = [];
                    snapshot.forEach((childSnapshot) => {
                        const childData = childSnapshot.val();
                        if (typesProduit.includes(childData.typeProduit)) {
                            allProducts.push(childData);
                        }
                    });
                    setProducts(allProducts);
                } else {
                    alert("No data available");
                }
            } catch (error) {
                console.error("Error reading data:", error);
            }
        }

        fetchData();
    }, [typesProduit]);

    return (
        <div>
            <ul>
                {products.map((product) => (
                    <li key={product.nom}>
                        {attributes.includes('nom') && product.nom && <p>{product.nom}</p>}
                        {attributes.includes('prix') && product.prix !== undefined && product.prix !== null && <p>{product.prix} €</p>}
                        {attributes.includes('description') && product.description && <p>{product.description}</p>}
                        {attributes.includes('listIdAllergenes') && product.listIdAllergenes && <p>Allergènes: {product.listIdAllergenes.join(', ')}</p>}
                        {attributes.includes('typeProduit') && product.typeProduit && <p>Type de produit: {product.typeProduit}</p>}
                        {attributes.includes('listIdMenu') && product.listIdMenu && <p>Menus: {product.listIdMenu.join(', ')}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReadByType;
