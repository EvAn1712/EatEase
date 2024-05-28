"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import app from "../firebase-config";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import PageHeader from '@/app/shared/page-header';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

export default function PointOfSalePage() {
    let [inputnom, setInputnom] = useState("");
    let [inputprix, setInputprix] = useState<number | null>(null);
    let [inputDescription, setInputDescription] = useState("");
    let [inputTypeProduit, setInputTypeProduit] = useState("");
    let [menuOptions, setMenuOptions] = useState<string[]>([]);
    let [menuMap, setMenuMap] = useState<{ [key: string]: string }>({});
    let [selectedMenu, setSelectedMenu] = useState("");
    let [saveStatus, setSaveStatus] = useState("");
    let [selectedAllergenes, setSelectedAllergenes] = useState<string[]>([]);
    let [image, setImage] = useState<File | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const allergenes = ["gluten", "oeuf", "lait", "arachide", "soja", "fruit à coque", "sésame", "sulfites", "moutarde", "lupin", "poisson", "crustacés", "mollusques", "céleri"];

    useEffect(() => {
        const fetchMenus = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "Menu");
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const menus = snapshot.val();
                const menuNames = Object.values(menus).map((menu: any) => menu.nom);
                const menuIds = Object.keys(menus);
                let map: { [key: string]: string } = {};
                for (let i = 0; i < menuIds.length; i++) {
                    map[menuNames[i]] = menuIds[i];
                }
                setMenuOptions(menuNames);
                setMenuMap(map);
            } else {
                console.log("No menus available");
            }
        }

        fetchMenus();
    }, []);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const Savedata = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const db = getDatabase(app);
            const storage = getStorage(app);
            const dbRef = ref(db, "Produit");
            const newProductRef = push(dbRef);
            let imageUrl = '';

            if (image) {
                const storageReference = storageRef(storage, `produits/${newProductRef.key}/${image.name}`);
                await uploadBytes(storageReference, image);
                imageUrl = await getDownloadURL(storageReference);
            }

            await set(newProductRef, {
                nom: inputnom,
                prix: inputprix,
                description: inputDescription,
                typeProduit: inputTypeProduit,
                idMenu: menuMap[selectedMenu],
                allergenes: selectedAllergenes,
                imageUrl: imageUrl,
                stock: 0,  // Ajout du champ stock avec une valeur de 0
            });
            console.log("Data saved");
            setSaveStatus("Data saved successfully!");

            // Reset the fields
            setInputnom("");
            setInputprix(null);
            setInputDescription("");
            setInputTypeProduit("");
            setSelectedMenu("");
            setSelectedAllergenes([]);
            setImage(null);
            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Error saving data:", error);
            setSaveStatus("Failed to save data.");
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        switch (name) {
            case "inputnom":
                setInputnom(value as string);
                break;
            case "inputprix":
                setInputprix(Number(value));
                break;
            case "inputDescription":
                setInputDescription(value as string);
                break;
            case "inputTypeProduit":
                setInputTypeProduit(value as string);
                break;
            case "selectedMenu":
                setSelectedMenu(value as string);
                break;
            case "selectedAllergenes":
                setSelectedAllergenes(value as string[]);
                break;
            default:
                break;
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
            <form onSubmit={Savedata} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="inputnom" className="text-lg font-bold">Nom du produit:</label>
                    <input
                        type="text"
                        id="inputnom"
                        name="inputnom"
                        value={inputnom}
                        onChange={handleChange}
                        placeholder="Entrez le nom du produit"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="inputprix" className="text-lg font-bold">Prix:</label>
                    <input
                        type="number"
                        id="inputprix"
                        name="inputprix"
                        value={inputprix || ''}
                        onChange={handleChange}
                        placeholder="Entrez le prix du produit"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="inputDescription" className="text-lg font-bold">Description:</label>
                    <textarea
                        id="inputDescription"
                        name="inputDescription"
                        value={inputDescription}
                        onChange={handleChange}
                        placeholder="Entrez la description du produit"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="inputTypeProduit" className="text-lg font-bold">Type de produit:</label>
                    <select
                        id="inputTypeProduit"
                        name="inputTypeProduit"
                        value={inputTypeProduit}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Sélectionnez le type de produit</option>
                        <option value="dessert">Dessert</option>
                        <option value="viennoisserie">Viennoiserie</option>
                        <option value="sandwiche">Sandwiche</option>
                        <option value="repas">Repas</option>
                        <option value="boisson">Boisson</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="selectedMenu" className="text-lg font-bold">Menu:</label>
                    <select
                        id="selectedMenu"
                        name="selectedMenu"
                        value={selectedMenu}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Aucun</option>
                        {menuOptions.map((menu) => (
                            <option key={menu} value={menu}>{menu}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="selectedallergenes" className="text-lg font-bold">Allergènes:</label>
                    <FormControl>
                        <InputLabel id="allergenes-label" className="text-lg font-bold"></InputLabel>
                        <Select
                            labelId="allergenes-label"
                            id="selectedAllergenes"
                            name="selectedAllergenes"
                            multiple
                            value={selectedAllergenes}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        >
                            {allergenes.map((allergene) => (
                                <MenuItem key={allergene} value={allergene}>{allergene}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="image" className="text-lg font-bold">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={imageInputRef}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <button type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Créer le produit</button>
                </div>
            </form>
            <p>{saveStatus}</p>
        </div>
    );
}
