import React from 'react';
import { PiCreditCardDuotone } from "react-icons/pi";

export const menuItems = [
  {
    name: 'Eat ease EPF',
  },
    {
        name: 'Accueil',
        href: '/point-of-sale',
        icon: <PiCreditCardDuotone />,
        //allowedDomains: ['epfadmin.fr', 'epfedu.fr'], // Domaines autorisés

    },
 {
    name: 'Ajout de Produit',
    href: '/ADMAjoutProduit',
    icon: <PiCreditCardDuotone />,
    //allowedDomains: ['epfadmin.fr'], // Domaines autorisés
  },
  {
    name: 'Mon profil',
    href: '/MonProfile',
    icon: <PiCreditCardDuotone />,
    //allowedDomains: ['epfedu.fr'], // Domaines autorisés
  },
  {
    name: 'Mes commandes',
    href: '/HistoriqueCommande',
    icon: <PiCreditCardDuotone />,
    //allowedDomains: ['epfedu.fr'], // Domaines autorisés
  },
  {
    name: 'Stock',
    href: '/ADMStock',
    icon: <PiCreditCardDuotone />,
    //allowedDomains: ['epfadmin.fr'], // Domaines autorisés
  },
 {
    name: 'Liste de Produits',
    href: '/ADMListProduit',
    icon: <PiCreditCardDuotone />,
    //allowedDomains: ['epfadmin.fr'], // Domaines autorisés
  },
    {
        name: 'Historique de Commande',
        href: '/ADMHistoriqueCommande',
        icon: <PiCreditCardDuotone />,
        //allowedDomains: ['epfadmin.fr'], // Domaines autorisés
    }
];
