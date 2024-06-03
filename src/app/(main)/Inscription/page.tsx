'use client';
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
  signOut
} from 'firebase/auth';
import { auth, useAuthContext } from '../authContext';
import { useRouter } from 'next/navigation';

// Assurez-vous que les icônes sont importées correctement
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye-off">
      <path d="M17.94 17.94L1 1m17.12 3.88C18.72 6.85 19 9.28 19 12c0 1.12-.08 2.23-.24 3.32M5.07 7.07C4.25 8.43 4 9.97 4 12c0 1.12.08 2.23.24 3.32m9.5 2.34l3.26 3.26a1 1 0 0 0 1.42 0l2-2a1 1 0 0 0 0-1.42L4.24 1.24a1 1 0 0 0-1.41 0l-2 2a1 1 0 0 0 0 1.42z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const SignupForm = () => {
  const me = useAuthContext(); // Retrieve user context

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    //@ts-ignore
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      // Update profile with first name and last name
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });
      await sendEmailVerification(userCredential.user);
      setMessage('Inscription réussie! Vérifiez votre e-mail pour valider votre compte.');
      // Optional: sign out the user immediately after registration to prevent access until email verification
      await signOut(auth);
    } catch (error) {
      console.error('Une erreur inattendue s\'est produite', error);
      setMessage('Une erreur inattendue s\'est produite. Veuillez réessayer.');
    }
  };

  return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inscription</h2>
        <form onSubmit={(event) => { event.preventDefault(); register(); }}>
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
          <div className="mb-4 relative flex items-center">
            <div className="flex-grow relative">
              <input type={passwordVisible ? "text" : "password"} id="password1" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" required onChange={(e) => setRegisterPassword(e.target.value)} />
              <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" aria-label={passwordVisible ? "Cacher le mot de passe" : "Afficher le mot de passe"}>
                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300">S&apos;inscrire</button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
  );
};

export default SignupForm;
