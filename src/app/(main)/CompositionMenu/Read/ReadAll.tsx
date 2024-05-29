"use client";
import React ,{useState} from 'react';
import app from "../../firebase-config";
import {getDatabase, ref,get} from "firebase/database";

function Read() {
    let [produitArray, setproduitArray] = useState<any>({});

    const fetchData = async () => {
        try {
            const db = getDatabase(app);
            const dbRef = ref(db, "Produit");
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setproduitArray(snapshot.val());
            } else {
                alert("No data available");
            }
        } catch (error) {
            console.error("Error reading data:", error);
        }
    }

    return (
        <div>
            <button onClick={fetchData}> Display data</button>
            <ul>
                {produitArray && Object.keys(produitArray).map((key) => {
                    return (
                        <li key={key}>
                            <p>{produitArray[key].nom}</p>
                            <p>{produitArray[key].prix}</p>
                            <p>{produitArray[key].description}</p>
                            <p>{produitArray[key].listIdAllergenes}</p>
                            <p>{produitArray[key].typeProduit}</p>
                            <p>{produitArray[key].listIdMenu}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Read;