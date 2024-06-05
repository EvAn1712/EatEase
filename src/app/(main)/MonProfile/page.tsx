'use client';
import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PageHeader from '@/app/shared/page-header';
import { AuthContext, AuthContextType } from '@/app/(main)/authContext';

const InfoPerso: React.FC = () => {
    const { user, updatePassword } = useContext(AuthContext) as AuthContextType;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        if (user) {
            const [firstName, lastName] = user.displayName?.split(' ') || ['', ''];
            setFormData({
                firstName: firstName,
                lastName: lastName,
                email: user.email || '',
                currentPassword: '',
                newPassword: '',
            });
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePassword = (password: string): string | null => {
        if (password.length < 8) {
            return "Le mot de passe doit contenir au moins 8 caractères.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Le mot de passe doit contenir au moins une lettre majuscule.";
        }
        if (!/[a-z]/.test(password)) {
            return "Le mot de passe doit contenir au moins une lettre minuscule.";
        }
        if (!/[0-9]/.test(password)) {
            return "Le mot de passe doit contenir au moins un chiffre.";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "Le mot de passe doit contenir au moins un symbole spécial.";
        }
        return null;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const passwordError = validatePassword(formData.newPassword);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            await updatePassword(formData.currentPassword, formData.newPassword);
            alert('Informations mises à jour avec succès!');
        } catch (error) {
            setError('Le mot de passe actuel est incorrect.');
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

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-lg text-gray-800">
                    Utilisateur non authentifié, veuillez vous connecter ou vous inscrire.
                </div>
            </div>
        );
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
                <div className="flex flex-col relative">
                    <label htmlFor="currentPassword" className="text-lg font-bold">Mot de passe actuel:</label>
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-10"
                    >
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="newPassword" className="text-lg font-bold">Nouveau mot de passe:</label>
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-10"
                    >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <div>
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Mettre à jour</button>
                </div>
            </form>
        </div>
    );
}

export default InfoPerso;
