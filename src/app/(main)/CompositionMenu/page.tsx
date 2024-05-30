"use client";
import React, {useState} from 'react';
import PageHeader from '@/app/shared/page-header';
import TestComponent from "@/app/(main)/CompositionMenu/temp";
import ReadAll from "@/app/(main)/Read/ReadAll";
import ReadById from "@/app/(main)/Read/ReadById";
import ReadByType from "@/app/(main)/Read/ReadByType";

const CompositionMenu: React.FC = () => {

    //HEADER
    const pageHeader = {
        title: 'Composition de votre menu',
        breadcrumb: [],
        className: "text-2xl font-lexend font-bold",
    };

    //IMAGE PLAT
    const imagePath = 'src/app/(main)/CompositionMenu/randomImageForTest.jpg';

    //BANNIERE ACCOMPAGNEMENT
    const [showAccompagnement, setShowAccompagnement] = useState(false);
    const toggleAccompagnement = () => {
        setShowAccompagnement(!showAccompagnement);
    };

    //SECTION ACCOMPAGNEMENT
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    //VALIDER BUTTON
    const [menu, setMenu] = useState('');
    const [plat, setPlat] = useState('');
    const [accompagnement1, setAccompagnement1] = useState('');
    const [accompagnement2, setAccompagnement2] = useState('');

    const handleSubmit = () => {
        // Envoyer les variables à un serveur ou les afficher dans la console
        console.log({menu, plat, accompagnement1, accompagnement2});
    };

    return (
        <div className="w-4/5 mx-auto py-8">
            {/*HEADER*/}
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
                className={pageHeader.className}
            />

            {/*<div>
                TEST A SUPP
            </div>
            <TestComponent/>


            <div>
                TEST READ BY ID
            </div>

            <ReadById productId="-Nyz9xGdFM-JcXj4oCEk" attributes={['nom', 'prix', 'description', 'listIdAllergenes', 'imageUrl']}/>

            <div>
                TEST READ ALL
            </div>
            <ReadAll attributes={['nom', 'prix', 'imageUrl']}/>

            <div>
                TEST READ BY TYPE
            </div>

            <ReadByType typesProduit={['Sandwich']} attributes={['nom', 'prix','imageUrl']} />*/}

            {/*IMAGE PLAT*/}
            <div className="my-4">
                <img src={imagePath} alt="image plat ici,si tu vois ce texte c'est que ça marche pas lol"
                     className="w-full h-auto rounded-md shadow-md"/>
            </div>

            {/*TEXTE EXPLICATIF*/}
            <p className="text-lg mb-4">Vous allez composer votre menu avec {plat} et 2 accompagnements.</p>

            {/*BANNIERE ACCOMPAGNEMENT*/}
            <div className="rectangular-section bg-gray-200 p-4 rounded-md shadow-md">
                <div>
                    <button onClick={toggleAccompagnement}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        {showAccompagnement ? 'Fermer' : 'Ouvrir'} Accompagnement 1
                    </button>
                </div>
                {showAccompagnement &&
                    <div className="mt-4">
                        <button onClick={() => handleCategoryClick("Entree")}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2">Entree
                        </button>
                        <button onClick={() => handleCategoryClick("Dessert")}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2">Dessert
                        </button>
                        <button onClick={() => handleCategoryClick("Boisson")}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2">Boisson
                        </button>
                        {selectedCategory === "Dessert" && (
                            <div className="mt-4">
                                <ReadByType typesProduit={['dessert']} attributes={['nom', 'prix', 'imageUrl']}/>
                            </div>
                        )}
                        {selectedCategory === "Entree" && (
                            <div className="mt-4">
                                <ReadByType typesProduit={['entree']} attributes={['nom', 'prix', 'imageUrl']}/>
                            </div>
                        )}
                        {selectedCategory === "Boisson" && (
                            <div className="mt-4">
                                <ReadByType typesProduit={['boisson']} attributes={['nom', 'prix', 'imageUrl']}/>
                            </div>
                        )}

                    </div>
                }
            </div>

            {/*VALIDER BUTTON*/}
            <button onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4">
                Valider
            </button>

        </div>
    );
}

export default CompositionMenu;
