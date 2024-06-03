import React, { useEffect, useState } from 'react';
import app from "src/app/(main)/firebase-config";
import { getDatabase, ref, get } from "firebase/database";

interface Product {
    nom?: string;
    prix?: number;
    description?: string;
    allergenes?: string[]; // Update the interface to reflect the correct structure
    typeProduit?: string;
    imageUrl?: string;
}

interface Props {
    typesProduit: string[];
    attributes: string[];
}

function ReadByType({ typesProduit, attributes }: Props) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
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
            }
        }

        fetchData();
    }, [typesProduit]);

    return (
        <div>
            <ul className="flex -mx-2">
                {products.map((product) => (
                    <li key={product.nom} className="w-40 sm:w-56 bg-white shadow-md rounded-lg overflow-hidden mx-2 my-2">
                        <div className="px-4 py-2">
                            {attributes.includes('nom') && product.nom &&
                                <p className="text-base font-semibold mb-1 truncate">{product.nom}</p>}
                        </div>
                        {attributes.includes('imageUrl') && product.imageUrl &&
                            <div className="aspect-w-1 aspect-h-1">
                                <img className="w-32 h-32 object-cover aspect-w-1 aspect-h-1" src={product.imageUrl} alt={product.nom || ''}/>
                            </div>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReadByType;
