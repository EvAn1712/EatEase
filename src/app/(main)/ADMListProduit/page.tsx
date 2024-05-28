"use client";
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { FaTrash } from 'react-icons/fa';

const ProductListAdmin = () => {
    const [products, setProducts] = useState([]);
    const [menus, setMenus] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const productsRef = ref(db, 'Produit');
                const snapshot = await get(productsRef);

                if (snapshot.exists()) {
                    const productsData = snapshot.val();
                    const productList = Object.keys(productsData).map(key => ({
                        id: key,
                        ...productsData[key]
                    }));
                    setProducts(productList);
                } else {
                    console.log('No data available');
                }

                const menusRef = ref(db, 'Menu');
                const menusSnapshot = await get(menusRef);

                if (menusSnapshot.exists()) {
                    const menusData = menusSnapshot.val();
                    const menuMap = {};
                    Object.keys(menusData).forEach(key => {
                        menuMap[key] = menusData[key].nom;
                    });
                    setMenus(menuMap);
                } else {
                    console.log('No menu data available');
                }
            } catch (error) {
                console.error('Error reading data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const db = getDatabase();
            const productRef = ref(db, `Produit/${productId}`);
            await remove(productRef);
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
            console.log(`Product ${productId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="w-4/5 mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Liste des produits</h2>
            <div className="flex flex-col gap-4">
                {products.map(product => (
                    <div key={product.id} className="flex flex-row border border-gray-300 rounded-md p-4 items-center">
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-xl font-bold">{product.nom}</h3>
                            <p><span className="font-bold underline">Prix:</span> {product.prix} €</p>
                            <p><span className="font-bold underline">Description:</span> {product.description}</p>
                            <p><span className="font-bold underline">Type de produit:</span> {product.typeProduit}</p>
                            <p><span className="font-bold underline">Menu:</span> {menus[product.idMenu]}</p>
                            <p><span
                                className="font-bold underline">Allergènes:</span> {product.allergenes ? product.allergenes.join(', ') : 'Aucun'}
                            </p>
                            <p><span className="font-bold underline">Stock:</span> {product.stock}</p>
                            <button onClick={() => handleDelete(product.id)}
                                    className="p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 my-2 flex items-center justify-center" style={{ maxWidth: '40px', minHeight: '10px' }}>
                                <FaTrash/>
                            </button>
                        </div>
                        {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.nom} className="w-32 h-32 object-cover" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListAdmin;

