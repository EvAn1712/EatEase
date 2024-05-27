"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import PageHeader from '@/app/shared/page-header';


interface ProductData {
    name: string;
    price: string;
    description: string;
    allergens: string[];
    productType: string;
    menuIds: string[];
    image: File | null;
}

const ProductCreationPage: React.FC = () => {
    const [productData, setProductData] = useState<ProductData>({
        name: '',
        price: '',
        description: '',
        allergens: [],
        productType: '',
        menuIds: [],
        image: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files ? e.target.files[0] : null;
        setProductData({ ...productData, image: imageFile });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('price', productData.price);
            formData.append('description', productData.description);
            formData.append('allergens', JSON.stringify(productData.allergens));
            formData.append('productType', productData.productType);
            formData.append('menuIds', JSON.stringify(productData.menuIds));
            if (productData.image) {
                formData.append('image', productData.image);
            }

            await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProductData({
                name: '',
                price: '',
                description: '',
                allergens: [],
                productType: '',
                menuIds: [],
                image: null,
            });

            alert('Produit créé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la création du produit :', error);
            alert('Une erreur est survenue lors de la création du produit.');
        }
    };

    const pageHeader = {
        title: 'Créer un produit',
        breadcrumb: [],
        className: "[&_h2]:font-lexend [&_h2]:font-bold",
    };

    return (
        <div className="w-4/5 mx-auto py-8">
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
                className={pageHeader.className}
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-lg font-bold">Nom du produit:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        placeholder="Entrez le nom du produit"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="text-lg font-bold">Prix:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        placeholder="Entrez le prix du produit"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-lg font-bold">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        placeholder="Entrez la description du produit"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="allergens" className="text-lg font-bold">Allergènes:</label>
                    <input
                        type="text"
                        id="allergens"
                        name="allergens"
                        value={productData.allergens.join(', ')}
                        onChange={(e) => setProductData({...productData, allergens: e.target.value.split(', ')})}
                        placeholder="Entrez les allergènes, séparés par des virgules"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="productType" className="text-lg font-bold">Type de produit:</label>
                    <input
                        type="text"
                        id="productType"
                        name="productType"
                        value={productData.productType}
                        onChange={handleChange}
                        placeholder="Entrez le type de produit"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="menuIds" className="text-lg font-bold">Menus:</label>
                    <input
                        type="text"
                        id="menuIds"
                        name="menuIds"
                        value={productData.menuIds.join(', ')}
                        onChange={(e) => setProductData({...productData, menuIds: e.target.value.split(', ')})}
                        placeholder="Entrez les IDs de menu, séparés par des virgules"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="image" className="text-lg font-bold">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Créer le produit</button>
                </div>
            </form>
        </div>
    );
};

export default ProductCreationPage;