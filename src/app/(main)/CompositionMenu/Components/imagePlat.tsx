"use client";
import React from 'react';
import ReadById from "@/app/(main)/Read/ReadById";

interface Props {
    plat: string;
}

const ImagePlat: React.FC<Props> = ({ plat }) => {
    return (
        <div className="flex justify-center items-center">
            <ReadById productId={plat} attributes={['imageUrl']}/>
        </div>
    );
};

export default ImagePlat;