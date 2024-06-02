"use client"
import React from 'react';

const ImagePlat: React.FC = () => {

    const imagePath = 'src/app/(main)/CompositionMenu/randomImageForTest.jpg';

    return (
        <div className="my-4">
            <img src={imagePath} alt="image plat ici,tqt ça vient" className="w-full h-auto rounded-md shadow-md"/>
        </div>
    );
};

export default ImagePlat;
