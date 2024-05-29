import React, { useEffect, useState } from 'react';
import app from "../../firebase-config";
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
    productId: string;
}

function ReadById({ productId }: Props) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase(app);
                const dbRef = ref(db, `Produit/${productId}`);
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    setProduct(snapshot.val());
                } else {
                    alert("No data available for this product");
                }
            } catch (error) {
                console.error("Error reading data:", error);
            }
        }

        fetchData();
    }, [productId]);

    if (product === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {product.nom && <h2>{product.nom}</h2>}
            {product.prix !== undefined && product.prix !== null && <p>{product.prix} €</p>}
            {product.description && <p>{product.description}</p>}
            {product.listIdAllergenes && <p>Allergènes: {product.listIdAllergenes.join(', ')}</p>}
            {product.typeProduit && <p>Type de produit: {product.typeProduit}</p>}
            {product.listIdMenu && <p>Menus: {product.listIdMenu.join(', ')}</p>}
        </div>
    );
}

export default ReadById;
