"use client";
import React, {useState} from 'react';
import Header from '@/app/(main)/CompositionMenu/Components/header';
import ImagePlat from '@/app/(main)/CompositionMenu/Components/imagePlat';
import TexteExplicatif from '@/app/(main)/CompositionMenu/Components/texteExplicatif';
import BanniereAccompagnement from '@/app/(main)/CompositionMenu/Components/banniereAccompagnent';
import ValiderBtn from '@/app/(main)/CompositionMenu/Components/ValiderBtn';
import ReadByType from '@/app/(main)/Read/ReadByType';
import ReadById from "@/app/(main)/Read/ReadById";

// input plat : temporaire
const plat = "-NzTumGjozaP3UoaT9Ie";


const CompositionMenu: React.FC = () => {

        return (
            <div className="w-4/5 mx-auto py-8">
                <Header/>
                <ImagePlat plat={plat}/>
                <TexteExplicatif plat={plat}/>
                <BanniereAccompagnement/>
                <ValiderBtn/>
            </div>
        );
}

export default CompositionMenu;