'use client';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth, useAuthContext } from '../authContext';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const user = useAuthContext();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetEmail, setResetEmail] = useState(""); // State for reset email
  const [resetMessage, setResetMessage] = useState(""); // State for reset message
  const [showResetPassword, setShowResetPassword] = useState(false); // State to toggle reset password section
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;

      if (user.emailVerified) {
        router.push('/point-of-sale');
      } else {
        setErrorMessage("Votre e-mail n'est pas vérifié. Veuillez vérifier votre e-mail avant de vous connecter.");
        await signOut(auth);
      }
    } catch (error) {
      console.error('Une erreur inattendue s\'est produite', error);
      setErrorMessage('Une erreur inattendue s\'est produite. Veuillez réessayer.');
    }
  };

  const handlePasswordReset = async () => {
    setResetMessage("");
    setErrorMessage("");

    if (!resetEmail) {
      setErrorMessage("Veuillez entrer votre adresse e-mail.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Un e-mail de réinitialisation du mot de passe a été envoyé.");
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation du mot de passe', error);
      setErrorMessage("Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation. Veuillez réessayer.");
    }
  };

  return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connexion</h2>
        <form onSubmit={(event) => { event.preventDefault(); login(); }}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email :</label>
            <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                required
                onChange={(event) => setLoginEmail(event.target.value)}
            />
          </div>
          <div className="mb-4 relative flex items-center">
            <div className="flex-grow relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Mot de passe :</label>
              <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                  onChange={(event) => setLoginPassword(event.target.value)}
              />
              <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  aria-label={passwordVisible ? "Cacher le mot de passe" : "Afficher le mot de passe"}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Se connecter
          </button>
        </form>
        {errorMessage && <p className="mt-4 text-center text-red-600">{errorMessage}</p>}

        <div className="mt-4 text-center">
          <button
              onClick={() => setShowResetPassword(!showResetPassword)}
              className="text-blue-600 hover:underline"
          >
            Mot de passe oublié ?
          </button>
        </div>

        {showResetPassword && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Réinitialiser le mot de passe</h2>
              <div className="mb-4">
                <label htmlFor="resetEmail" className="block text-gray-700 font-medium mb-1">Email :</label>
                <input
                    type="email"
                    id="resetEmail"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    required
                    onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              <button
                  onClick={handlePasswordReset}
                  className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Réinitialiser le mot de passe
              </button>
              {resetMessage && <p className="mt-4 text-center text-green-600">{resetMessage}</p>}
              {errorMessage && <p className="mt-4 text-center text-red-600">{errorMessage}</p>}
            </div>
        )}
      </div>
  );
};

export default LoginForm;
