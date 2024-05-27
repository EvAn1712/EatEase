"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import PageHeader from '@/app/shared/page-header';

const InfoPerso: React.FC = () => {
    const [user, setUser] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('User information submitted:', user);
        alert('Informations mises à jour avec succès!');
    };

    const pageHeader = {
        title: 'Informations Personnelles',
        breadcrumb: [],
        className: "[&_h2]:font-lexend [&_h2]:font-bold",
    };

    return (
        <div className="w-4/5 mx-auto py-8">
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
                className={pageHeader.className}
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-lg font-bold">Prénom:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-lg font-bold">Nom:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-lg font-bold">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        readOnly
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-lg font-bold">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Mettre à jour</button>
                </div>
            </form>
        </div>
    );
}

export default InfoPerso;