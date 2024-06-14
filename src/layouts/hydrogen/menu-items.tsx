import React from 'react';
import { PiCreditCardDuotone } from "react-icons/pi";
import { AuthContextType, auth, useAuthContext } from '@/app/(main)/authContext';
export const menuItems = [
  {
    name: 'Eat ease EPF',
  },
    {
        name: 'Commandes en cours',
        href: '/ADMHistoriqueCommande',
        icon: <PiCreditCardDuotone />,
        allowedDomains: ['gmail.com'], // Domaines autorisés
    },
    {
        name: 'Accueil',
        href: '/point-of-sale',
        icon: <PiCreditCardDuotone />,
       allowedDomains: ['gmail.com', 'epfedu.fr'], // Domaines autorisés

    },
 {
    name: 'Ajout de Produit',
    href: '/ADMAjoutProduit',
    icon: <PiCreditCardDuotone />,
   allowedDomains: ['gmail.com'], // Domaines autorisés
  },
  {
    name: 'Mon profil',
    href: '/MonProfile',
    icon: <PiCreditCardDuotone />,
    allowedDomains: ['epfedu.fr'], // Domaines autorisés
  },
  {
    name: 'Mes commandes',
    href: '/HistoriqueCommande',
    icon: <PiCreditCardDuotone />,
    allowedDomains: ['epfedu.fr'], // Domaines autorisés
  },
  {
    name: 'Stock',
    href: '/ADMStock',
    icon: <PiCreditCardDuotone />,
   allowedDomains: ['gmail.com'], // Domaines autorisés
  },
 {
    name: 'Liste de Produits',
    href: '/ADMListProduit',
    icon: <PiCreditCardDuotone />,
   allowedDomains: ['gmail.com'], // Domaines autorisés
  },
];

const Menu = () => {
  const user  = useAuthContext();

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connexion requise</h2>
        <p className="text-gray-700">Veuillez vous connecter ou vous inscrire pour voir le contenu.</p>
      </div>
    );
  }

  const userDomain = user.split('@')[0];

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      {menuItems.map((item, index) => {
        if (!item.allowedDomains || item.allowedDomains.includes(userDomain)) {
          return (
            <div key={index} className="mb-4">
              <a href={item.href} className="flex items-center text-blue-500 hover:underline">
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </a>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Menu;