"use client";
import React, { useState } from 'react';
import Header from '@/app/(main)/CompositionMenu/Components/header';
import ImagePlat from '@/app/(main)/CompositionMenu/Components/imagePlat';
import TexteExplicatif from '@/app/(main)/CompositionMenu/Components/texteExplicatif';
import BanniereAccompagnement from '@/app/(main)/CompositionMenu/Components/banniereAccompagnent';
import ValiderBtn from '@/app/(main)/CompositionMenu/Components/ValiderBtn';

const CompositionMenu: React.FC = () => {
        const [menu, setMenu] = useState<any[]>([]);
        //choix temporaire
        const [plat, setPlat] = useState<string>("-NzTumGjozaP3UoaT9Ie");
        const [accompagnement1, setAccompagnement1] = useState<{ id: string, nom: string }>({ id: '', nom: '' });
        const [accompagnement2, setAccompagnement2] = useState<{ id: string, nom: string }>({ id: '', nom: '' });

    // Function to update menu when accompagnement1 changes
        const updateMenu = () => {
                setMenu([plat, accompagnement1, accompagnement2]);
        };

        return (
            <div className="w-4/5 mx-auto py-8">
                <Header/>
                <ImagePlat plat={plat}/>
                <TexteExplicatif plat={plat}/>
                <BanniereAccompagnement onAccompagnementChange={setAccompagnement1} title={" Choix Accompagnement 1 "}/>
                <div className="mb-4"></div>
                <BanniereAccompagnement onAccompagnementChange={setAccompagnement2} title={" Choix Accompagnement 2 "}/>
                <ValiderBtn updateMenu={updateMenu}/>
            </div>
        );
}

export default CompositionMenu;
