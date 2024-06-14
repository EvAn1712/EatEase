'use client';
import React, { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { auth } from '../authContext';
import PageHeader from '@/app/shared/page-header';

const InfoPerso: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [resetMessage, setResetMessage] = useState('');
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const [firstName, lastName] = user.displayName?.split(' ') || ['', ''];
                setFormData({
                    firstName: firstName,
                    lastName: lastName,
                    email: user.email || '',
                });
                setLoading(false);
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const displayName = `${formData.firstName} ${formData.lastName}`;
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: displayName });
                setSuccessMessage('Nom d\'affichage mis à jour avec succès!');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du nom d\'affichage :', error);
            setError('Une erreur est survenue lors de la mise à jour du nom d\'affichage.');
        }
    };

    const handlePasswordReset = async () => {
        setResetMessage('');
        setErrorMessage('');

        try {
            await sendPasswordResetEmail(auth, formData.email);
            setResetMessage("Un e-mail de réinitialisation du mot de passe a été envoyé.");
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation du mot de passe', error);
            setErrorMessage("Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation. Veuillez réessayer.");
        }
    };

    const pageHeader = {
        title: 'Informations Personnelles',
        breadcrumb: [],
        className: "[&_h2]:font-lexend [&_h2]:font-bold",
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="w-4/5 mx-auto py-8">
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
                className={pageHeader.className}
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <div className="text-red-500">{error}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-lg font-bold">Prénom:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
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
                        value={formData.lastName}
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
                        value={formData.email}
                        readOnly
                        className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div>
                    <button type="submit" className="border border-bg-primary text-bg-primary px-4 py-2 mr-4 rounded-md hover:bg-primary hover:text-white focus:outline-none focus:bg-primary focus:text-white">Mettre à jour </button>
                </div>
            </form>
            <div className="mt-4 text-center">
                <button
                    onClick={handlePasswordReset}
                    className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Changer le mot de passe
                </button>
                {resetMessage && <p className="mt-4 text-center text-green-600">{resetMessage}</p>}
                {errorMessage && <p className="mt-4 text-center text-red-600">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default InfoPerso;
