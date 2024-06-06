import React, { useEffect, useState } from 'react';
import Read from './Read';

interface ChoixItemsProps {
    formule: { id: string, nom: string };
    onItemsChange: (newItems: string[]) => void;
}

const ChoixItems: React.FC<ChoixItemsProps> = ({ formule, onItemsChange }) => {
    const [items1, setItems1] = useState<{ id: string, nom: string }[]>([]);
    const [items2, setItems2] = useState<{ id: string, nom: string }[]>([]);
    const [items3, setItems3] = useState<{ id: string, nom: string }[]>([]);
    const [selectedItem, setSelectedItem] = useState<{ id: string, nom: string } | null>(null);

    const getFilterForFormule = (formuleId: string) => {
        switch (formuleId) {
            case "-Ny0b_XDIqRGzKeA_3Xq":
                return { types: ["boisson_chaude", "viennoiserie"] };
            case "-Ny4dSqlcGVqVNEYMdkb":
                return { types: ["boisson_chaude", "viennoiserie"] };
            case "-NzSwi84Ff1Uc8CaE2xI":
                return { types: ["plat", "snacking", "dessert", "entree", "boisson"] };
            case "-NzSwpmIy_MkZXhdv2p1":
                return { types: ["plat", "snacking", "dessert", "entree", "boisson"] };
            default:
                return { types: [] };
        }
    };

    const filter = getFilterForFormule(formule.id);

    useEffect(() => {
        onItemsChange([...items1, ...items2, ...items3].map(item => item.nom));
    }, [items1, items2, items3]);

    const handleItemChange1 = (item: { id: string, nom: string }) => {
        setItems1([item]);
        setSelectedItem(item);
    };

    const handleItemChange2 = (item: { id: string, nom: string }) => {
        setItems2([item]);
        setSelectedItem(item);
    };

    const handleItemChange3 = (item: { id: string, nom: string }) => {
        setItems3([item]);
        setSelectedItem(item);
    };

    return (
        <div>
            {formule.nom === "Petit dej'" || formule.nom === "Maxi petit dej'" ? (
                <>
                    <Read
                        databaseName="Produit"
                        attributes={["nom", "imageUrl"]}
                        filter={{ typeProduit: filter.types[0], menu: formule.id }}
                        onItemChange={handleItemChange1}
                        showItem={true}
                        selectedItem={selectedItem} // Pass selectedItem attribute
                    />
                    <Read
                        databaseName="Produit"
                        attributes={["nom", "imageUrl"]}
                        filter={{ typeProduit: filter.types[1], menu: formule.id }}
                        onItemChange={handleItemChange2}
                        showItem={true}
                        selectedItem={selectedItem} // Pass selectedItem attribute
                    />
                </>
            ) : formule.nom === "First" || formule.nom === "Maxi" ? (
                <>
                    <Read
                        databaseName="Produit"
                        attributes={["nom", "imageUrl"]}
                        filter={{ typeProduit: `${filter.types[0]}, ${filter.types[1]}`, menu: formule.id }}
                        onItemChange={handleItemChange1}
                        showItem={true}
                        selectedItem={selectedItem} // Pass selectedItem attribute
                    />
                    <Read
                        databaseName="Produit"
                        attributes={["nom", "imageUrl"]}
                        filter={{ typeProduit: `${filter.types[2]}, ${filter.types[3]}, ${filter.types[4]}`, menu: formule.id }}
                        onItemChange={handleItemChange2}
                        showItem={true}
                        selectedItem={selectedItem} // Pass selectedItem attribute
                    />
                    <Read
                        databaseName="Produit"
                        attributes={["nom", "imageUrl"]}
                        filter={{ typeProduit: `${filter.types[2]}, ${filter.types[3]}, ${filter.types[4]}`, menu: formule.id }}
                        onItemChange={handleItemChange3}
                        showItem={true}
                        selectedItem={selectedItem} // Pass selectedItem attribute
                    />
                </>
            ) : null}
        </div>
    );
};

export default ChoixItems;
