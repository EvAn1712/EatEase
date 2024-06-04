import React, { useEffect, useState, memo } from 'react';
import app from "src/app/(main)/firebase-config";
import { getDatabase, ref, get } from "firebase/database";

interface Product {
    id: string;
    nom: string;
    prix: number;
    description: string;
    allergenes: string[];
    typeProduit: string;
    imageUrl: string;
}

interface Props {
    typesProduit: string[];
    attributes: string[];
    onAccompagnementChange: (accompagnement: string) => void;
    showAccompagnement: boolean; // add this prop to track the banner's open/close state
    selectedAccompagnement?: Product; // add this prop to track the selected product
}

function ReadByType({ typesProduit, attributes, onAccompagnementChange, showAccompagnement, selectedAccompagnement }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
                            allProducts.push({ ...childData, id: childSnapshot.key });
                        }
                    });
                    setProducts(allProducts);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, [typesProduit]);


    useEffect(() => {
        if (showAccompagnement && selectedAccompagnement) {
            setSelectedProduct(selectedAccompagnement);
        }
    }, [showAccompagnement, selectedAccompagnement]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        onAccompagnementChange(product.nom);
    };

    return (
        <div>
            <ul className="flex -mx-2">
                {products.map((product) => (
                    <li
                        key={product.id}
                        className={`w-40 sm:w-56 bg-white shadow-md rounded-lg overflow-hidden mx-2 my-2 hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer
                            ${selectedProduct?.id === product.id ? 'border-2 border-red-500' : ''}`}
                        onClick={() => handleProductClick(product)}
                    >
                        <div className="px-4 py-2">
                            {attributes.includes("nom") && (
                                <p className="text-sm font-semibold mb-1">{product.nom}</p>
                            )}
                        </div>
                        {attributes.includes("imageUrl") && (
                            <div className="aspect-w-1 aspect-h-1">
                                <img
                                    className="w-32 h-32 object-cover aspect-w-1 aspect-h-1"
                                    src={product.imageUrl}
                                    alt={product.nom}
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>


    );
}

export default memo(ReadByType);
