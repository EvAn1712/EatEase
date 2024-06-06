import React, {memo, useEffect, useState} from 'react';
import app from "src/app/(main)/firebase-config";
import {get, getDatabase, ref} from "firebase/database";

interface Item {
    id: string;
    nom: string;
    prix: number;
    description?: string;
    allergenes?: string[];
    typeProduit?: string;
    imageUrl?: string;
}

interface Props {
    databaseName: string;
    attributes: string[];
    filter: string | "none";
    onItemChange: (item: { id: string, nom: string }) => void;
    showItem: boolean;
    selectedItem?: Item;
}

function Read({databaseName, attributes, filter, onItemChange, showItem, selectedItem}: Props) {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase(app);
                const dbRef = ref(db, databaseName);
                const snapshot = await get(dbRef);

                if (snapshot.exists()) {
                    const allItems: Item[] = [];
                    snapshot.forEach((childSnapshot) => {
                        const childData = childSnapshot.val();
                        if (filter === "none" || filter.includes(childData.typeProduit)) {
                            allItems.push({...childData, id: childSnapshot.key});
                        }
                    });
                    setItems(allItems);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, [databaseName, filter]);

    useEffect(() => {
        if (showItem && selectedItem) {
            setSelectedProduct(selectedItem);
        }
    }, [showItem, selectedItem]);

    const handleItemClick = (item: Item) => {
        setSelectedProduct(item);
        onItemChange({id: item.id, nom: item.nom});
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            <ul className="flex flex-wrap justify-center items-stretch p-4 gap-4">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={`flex flex-col justify-between max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer
                    ${selectedProduct?.id === item.id ? 'border-2 border-red-500' : ''}`}
                        onClick={() => handleItemClick(item)}
                    >
                        <div className="flex flex-col items-center p-4 text-center">
                            {attributes.includes("nom") && (
                                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4">{item.nom}</p>
                            )}
                            {attributes.includes("prix") && (
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-1">{item.prix} €</p>
                            )}
                        </div>
                        {attributes.includes("imageUrl") && item.imageUrl && (
                            <div className="flex justify-center items-center p-4">
                                <img
                                    className="w-32 h-32 object-cover"
                                    src={item.imageUrl}
                                    alt={item.nom}
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>


    );
}

export default memo(Read);
