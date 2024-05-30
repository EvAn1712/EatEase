import React, { useEffect, useState } from 'react';
import app from "../firebase-config";
import { getDatabase, ref, get, orderByChild, equalTo } from "firebase/database";

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
}

function ReadByType({ typesProduit }: Props) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase(app);
                const dbRef = ref(db, 'Produit');
                const query = orderByChild('typeProduit');
                typesProduit.forEach(async (type) => {
                    const snapshot = await get(dbRef, { ...query, equalTo: type });
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const productsArray = Object.values(data);
                        setProducts((prevProducts) => [...prevProducts, ...productsArray]);
                    } else {
                        alert(`No data available for type ${type}`);
                    }
                });
            } catch (error) {
                console.error("Error reading data:", error);
            }
        }

        fetchData();
    }, [typesProduit]);

    return (
        <div>
            {products.length === 0 && <div>Loading...</div>}
            <ul>
                {products.map((product) => (
                    <li key={product.nom}>
                        <p>{product.nom}</p>
                        <p>{product.prix}</p>
                        <p>{product.description}</p>
                        <p>{product.listIdAllergenes}</p>
                        <p>{product.typeProduit}</p>
                        <p>{product.listIdMenu}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReadByType;
