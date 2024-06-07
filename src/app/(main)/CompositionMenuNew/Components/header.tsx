"use client"
import React from 'react';
import PageHeader from "@/app/shared/page-header";

const Header: React.FC = () => {

    const pageHeader = {
        title: 'Composition de votre menu',
        breadcrumb: [],
        className: "text-2xl font-lexend font-bold",
    };

    return (
        <PageHeader
            title={pageHeader.title}
            breadcrumb={pageHeader.breadcrumb}
            className={pageHeader.className}
        />
    );
};

export default Header;