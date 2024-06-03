"use client";
import React, {useState} from 'react';
import Header from '@/app/(main)/CompositionMenu/Components/header';
import ImagePlat from '@/app/(main)/CompositionMenu/Components/imagePlat';
import TexteExplicatif from '@/app/(main)/CompositionMenu/Components/texteExplicatif';
import BanniereAccompagnement from '@/app/(main)/CompositionMenu/Components/banniereAccompagnent';
import ValiderBtn from '@/app/(main)/CompositionMenu/Components/ValiderBtn';
import ReadByType from '@/app/(main)/Read/ReadByType';

// input : plat = -NzTumGjozaP3UoaT9Ie (salade vege)

const CompositionMenu: React.FC = () => {

        return (
            <div className="w-4/5 mx-auto py-8">
                <Header/>
                <ImagePlat plat={"-NzTumGjozaP3UoaT9Ie"}/>
                <TexteExplicatif/>
                <BanniereAccompagnement/>
                <ValiderBtn/>
            </div>
        );
}

export default CompositionMenu;