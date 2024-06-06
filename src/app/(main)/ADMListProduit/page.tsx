"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { FaTrash } from 'react-icons/fa';
import {useAdminCheck} from "@/app/(main)/authContext";
import {useModal} from "@/app/shared/modal-views/use-modal";


interface IProduct {
    id: string;
    nom: string;
    prix: number;
    description: string;
    typeProduit: string;
    idMenus: string[];
    allergenes: string[];
    imageUrl: string;
    stock: number;
    [key: string]: any;
}

const ProductListAdmin: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [menus, setMenus] = useState<{ [key: string]: string }>({});
    const [image, setImage] = useState<File | null>(null);
    const [searchText, setSearchText] = useState<string>(''); // Ajouter l'état de recherche


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

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
                    const menuMap: { [key: string]: string } = {};
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

    const handleDelete = async (productId: string) => {
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

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const sortProducts = (products: IProduct[]) => {
        return products.sort((a, b) => {
            if (a.typeProduit.toLowerCase() < b.typeProduit.toLowerCase()) return -1;
            if (a.typeProduit.toLowerCase() > b.typeProduit.toLowerCase()) return 1;
            if (a.nom.toLowerCase() < b.nom.toLowerCase()) return -1;
            if (a.nom.toLowerCase() > b.nom.toLowerCase()) return 1;
            return 0;
        });
    };

    const filteredAndSortedProducts = sortProducts(products.filter(product =>
        product.nom.toLowerCase().includes(searchText.toLowerCase())
    ));

    if (!useAdminCheck()) {
        return(
            <div className="mt-4 pb-3 3xl:mt-6 text-center">
                <p className="text-gray-700 font-bold">Veuillez vous connecter en tant qu'admin pour accéder au
                    contenu.</p>
                <div className="flex justify-center mt-4">
                    <a href="/point-of-sale" onClick={() => {
                        window.location.href = '/point-of-sale';
                    }}
                       className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Accueil
                    </a>
                </div>
            </div>
        );
    }
        return (
            <div className="w-4/5 mx-auto py-8">
                <h2 className="text-2xl font-bold mb-4">Liste des produits</h2>
                <input
                    type="text"
                    placeholder="Rechercher un produit"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="mb-4 p-2 border border-gray-300 rounded-md"
                />
                <div className="flex flex-col gap-4">
                    {filteredAndSortedProducts.map((product: IProduct) => (
                        <div key={product.id}
                             className="flex flex-row border border-gray-300 rounded-md p-4 items-center">
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-bold">{product.nom}</h3>
                                <p><span className="font-bold underline">Prix:</span> {product.prix} €</p>
                                <p><span className="font-bold underline">Description:</span> {product.description}</p>
                                <p><span className="font-bold underline">Type de produit:</span> {product.typeProduit}
                                </p>
                                <p><span
                                    className="font-bold underline">Menus:</span> {product.idMenus && Array.isArray(product.idMenus) ? product.idMenus.map(menuId => menus[menuId]).join(', ') : 'Aucun'}
                                </p>
                                <p><span
                                    className="font-bold underline">Allergènes:</span> {product.allergenes ? product.allergenes.join(', ') : 'Aucun'}
                                </p>
                                <p><span className="font-bold underline">Stock:</span> {product.stock}</p>
                                <button onClick={() => handleDelete(product.id)}
                                        className="p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 my-2 flex items-center justify-center"
                                        style={{maxWidth: '40px', minHeight: '10px'}}>
                                    <FaTrash/>
                                </button>
                            </div>
                            {product.imageUrl && (
                                <img src={product.imageUrl} alt={product.nom} className="w-32 h-32 object-cover"/>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );

};

export default ProductListAdmin;
