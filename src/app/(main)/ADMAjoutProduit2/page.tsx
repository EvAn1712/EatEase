"use client";
import React ,{useState, useEffect} from 'react';
import app from "../firebase-config";
import {getDatabase, ref,set, push, get} from "firebase/database";
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

export default function PointOfSalePage() {
    let [inputnom,setInputnom] = useState("");
    let [inputprix,setInputprix] = useState<number | null>(null);
    let [inputDescription, setInputDescription] = useState("");
    let [inputTypeProduit, setInputTypeProduit] = useState("");
    let [menuOptions, setMenuOptions] = useState<string[]>([]);
    let [menuMap, setMenuMap] = useState<{ [key: string]: string }>({});
    let [selectedMenu, setSelectedMenu] = useState("");
    let [saveStatus, setSaveStatus] = useState("");
    let [selectedAllergenes, setSelectedAllergenes] = useState<string[]>([]);
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

    const Savedata = async () => {
        try {
            const db = getDatabase(app);
            const dbRef = ref(db, "Produit");
            const newProductRef = push(dbRef);
            await set(newProductRef, {
                nom: inputnom,
                prix: inputprix,
                description: inputDescription,
                typeProduit: inputTypeProduit,
                idMenu: menuMap[selectedMenu],
                allergenes: selectedAllergenes // Utilisez les allergènes sélectionnés
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
        } catch (error) {
            console.error("Error saving data:", error);
            setSaveStatus("Failed to save data.");
        }
    };


    return (
        <div>
            <h2>Créer un nouveau produit</h2><br/>
            <form>
                <label>
                    Nom du produit:
                    <input type="text" value={inputnom} onChange={(e) => setInputnom(e.target.value)}/>
                </label><br/><br/>
                <label>
                    Prix du produit:
                    <input type="number" value={inputprix || ''}
                           onChange={(e) => setInputprix(Number(e.target.value))}/>
                </label><br/><br/>
                <label>
                    Description du produit:
                    <input type="text" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)}/>
                </label><br/><br/>
                <label>
                    Type de produit:
                    <select value={inputTypeProduit} onChange={(e) => setInputTypeProduit(e.target.value)}>
                        <option value="">Sélectionnez le type de produit</option>
                        <option value="dessert">Dessert</option>
                        <option value="viennoisserie">Viennoiserie</option>
                        <option value="sandwiche">Sandwiche</option>
                        <option value="repas">Repas</option>
                        <option value="boisson">Boisson</option>
                    </select>
                </label><br/><br/>
                <label>
                    Menu:
                    <select value={selectedMenu} onChange={(e) => setSelectedMenu(e.target.value)}>
                        <option value="">Aucun</option>
                        {menuOptions.map((menu) => (
                            <option key={menu} value={menu}>{menu}</option>
                        ))}
                    </select>
                </label><br/><br/>
                <FormControl>
                    <InputLabel id="demo-mutiple-name-label">Allergenes</InputLabel>
                    <Select
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        multiple
                        value={selectedAllergenes}
                        onChange={(e) => setSelectedAllergenes(e.target.value as string[])}
                    >
                        {allergenes.map((allergene) => (
                            <MenuItem key={allergene} value={allergene}>{allergene}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <button
                    type="button"
                    onClick={Savedata}
                    style={{
                        backgroundColor: '#4CAF50', /* Green */
                        border: 'none',
                        color: 'white',
                        padding: '15px 32px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '12px',
                        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
                    }}
                >
                    Enregistrer le produit
                </button>
            </form>
            <p>{saveStatus}</p>
        </div>
    )
}