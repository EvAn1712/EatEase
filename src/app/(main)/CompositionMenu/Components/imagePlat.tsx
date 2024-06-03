"use client";
import React from 'react';
import ReadById from "@/app/(main)/Read/ReadById";

interface Props {
    plat: string; // Add the 'plat' variable to props
}

const ImagePlat: React.FC<Props> = ({ plat }) => {
    return (
        <div>
            <ReadById productId={plat} attributes={['imageUrl']}/>
        </div>
    );
};

export default ImagePlat;