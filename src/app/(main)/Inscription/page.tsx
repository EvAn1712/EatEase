'use client';
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { auth, useAuthContext } from '../authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
  
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="feather feather-eye-off">
    <path d="M17.94 17.94L1 1m17.12 3.88C18.72 6.85 19 9.28 19 12c0 1.12-.08 2.23-.24 3.32M5.07 7.07C4.25 8.43 4 9.97 4 12c0 1.12.08 2.23.24 3.32m9.5 2.34l3.26 3.26a1 1 0 0 0 1.42 0l2-2a1 1 0 0 0 0-1.42L4.24 1.24a1 1 0 0 0-1.41 0l-2 2a1 1 0 0 0 0 1.42z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const SignupForm = () => {
  const user = useAuthContext(); // Retrieve user context

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");  // Ajout de l'état pour gérer les erreurs

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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

  const validateEmail = (email: string): string | null => {
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'epfedu.fr' && emailDomain !== 'epfadmin.fr') {
      return "L'adresse e-mail doit se terminer par @epfedu.fr ou @epfadmin.fr";
    }
    return null;
  };

  const register = async () => {
    setError(""); // Reset error state
    setMessage(""); // Reset message state

    const emailError = validateEmail(registerEmail);
    if (emailError) {
      setError(emailError);
      return;
    }

    const passwordError = validatePassword(registerPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      // Mettre à jour le profil avec le prénom et le nom
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });
      console.log("Profil mis à jour avec succès !");
      router.push('/point-of-sale'); // Rediriger après une inscription réussie
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("Un compte est déjà associé à cette adresse e-mail. Veuillez vous connecter.");
      } else {
        console.error('Une erreur inattendue s\'est produite', error);
        setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inscription</h2>
      <form onSubmit={(event) => { event.preventDefault(); register(); }}>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error.includes("Veuillez vous connecter") ? (
              <span>
                {error.split("Veuillez vous connecter")[0]}
                <Link href="/Connexion" className="text-blue-500 underline"> Veuillez vous connecter</Link>
              </span>
            ) : (
              <span>{error}</span>
            )}
          </div>
        )}
        {message && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">Prénom :</label>
          <input type="text" id="firstName" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" required onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">Nom :</label>
          <input type="text" id="lastName" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" required onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email :</label>
          <input type="email" id="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" required onChange={(e) => setRegisterEmail(e.target.value)} />
        </div>
        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Mot de passe :</label>
        <div className="mb-4 relative flex items-center">
          <div className="flex-grow relative">
            <input type={passwordVisible ? "text" : "password"} id="password" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" required onChange={(e) => setRegisterPassword(e.target.value)} />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" aria-label={passwordVisible ? "Cacher le mot de passe" : "Afficher le mot de passe"}>
              {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">Le mot de passe doit contenir au moins 8 caractères, incluant une lettre majuscule, une lettre minuscule, un chiffre et un symbole spécial.</p>
        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignupForm;
