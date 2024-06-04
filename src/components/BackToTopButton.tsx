'use client';
import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Fonction pour détecter le défilement et afficher ou masquer le bouton
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fonction pour faire défiler la page vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5">
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            backgroundColor: '#E30613', // Couleur rouge Crous
            color: '#ffffff', // Couleur du texte
          }}
          className="p-4 rounded-full shadow-lg hover:bg-opacity-80 transition duration-300"
        >
          <span className="text-2xl">↑</span> {/* Taille de la flèche ajustée ici */}
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
