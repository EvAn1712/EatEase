import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import app from "src/app/(main)/firebase-config";
import { get, getDatabase, ref } from "firebase/database";

interface Item {
    id: string;
    nom: string;
    prix: number;
    description?: string;
    allergenes?: string[];
    typeProduit?: string;
    imageUrl?: string;
    idMenus?: string[];
    stock?: number; // Added stock property
}

interface Props {
    databaseName: string;
    attributes: string[];
    filter: { typeProduit: string[] | "none", menu: string | "none" };
    onItemChange: (item: { id: string, nom: string }) => void;
    showItem: boolean;
    selectedItem?: Item;
}

const Read: React.FC<Props> = ({ databaseName, attributes, filter, onItemChange, showItem, selectedItem }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchData = useCallback(async () => {
        try {
            const db = getDatabase(app);
            const dbRef = ref(db, databaseName);
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const allItems: Item[] = [];
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    if (
                        (filter.typeProduit === "none" || filter.typeProduit.includes(childData.typeProduit)) &&
                        (filter.menu === "none" || (Array.isArray(childData.idMenus) && childData.idMenus.includes(filter.menu)))
                    ) {
                        allItems.push({ ...childData, id: childSnapshot.key });
                    }
                });
                setItems(allItems);
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }, [databaseName, filter]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (showItem && selectedItem) {
            setSelectedProduct(selectedItem);
        }
    }, [showItem, selectedItem]);

    const resizeHandler = useCallback(() => {
        const containerWidth = containerRef.current?.offsetWidth ?? 0;
        const numItems = items.length;
        const fontSize = Math.min(containerWidth / (numItems * 5), 25);
        if (containerRef.current) {
            containerRef.current.style.fontSize = `${fontSize}px`;
        }
    }, [items]);

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [resizeHandler]);

    const handleItemClick = useCallback((item: Item) => {
        if (item.stock !== 0) { // Ensure the item is not out of stock
            setSelectedProduct(item);
            onItemChange({ id: item.id, nom: item.nom });
        }
    }, [onItemChange]);

    return (
        <div ref={containerRef} className="flex justify-center items-center w-full h-full">
            <ul className="flex flex-wrap justify-center items-stretch p-4 gap-4">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={`flex flex-col justify-between bg-white shadow-md rounded-lg overflow-hidden ${
                            item.stock === 0 ? 'cursor-not-allowed opacity-50' : 'hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer'
                        } ${
                            selectedProduct?.id === item.id ? 'border-2 border-red-500' : ''
                        }`}
                        style={{ width: '200px' }} // Fixed width for all cards
                        onClick={() => handleItemClick(item)}
                    >
                        <div className="flex flex-col items-center p-4 text-center">
                            {attributes.includes("nom") && (
                                <p className="font-semibold mb-4" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{item.nom}</p>
                            )}
                            {attributes.includes("prix") && (
                                <div className="mb-1">
                                    {item.prix} €
                                </div>
                            )}
                            {item.stock === 0 && (
                                <div className="text-red-500 font-bold">
                                    Indisponible
                                </div>
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
