import React from 'react';
import { PiCreditCardDuotone } from "react-icons/pi";

export const menuItems = [
  {
    name: 'Eat ease EPF',
  },
    {
        name: 'Point de Vente',
        href: '/point-of-sale',
        icon: <PiCreditCardDuotone />,
    },
 {
    name: 'Ajout de Produit',
    href: '/ADMAjoutProduit',
    icon: <PiCreditCardDuotone />,
  },
  {
    name: 'Mon Profile',
    href: '/MonProfile',
    icon: <PiCreditCardDuotone />,
  },
  {
    name: 'Historique de Commande',
    href: '/HistoriqueCommande',
    icon: <PiCreditCardDuotone />,
  },
  {
    name: 'Stock',
    href: '/ADMStock',
    icon: <PiCreditCardDuotone />,
  },
 {
    name: 'Liste de Produits',
    href: '/ADMListProduit',
    icon: <PiCreditCardDuotone />,
  },
  {
    name: 'Liste de Produits2',
    href: '/ADMListProduit2',
    icon: <PiCreditCardDuotone />,
  },
    {
        name: 'Historique de Commande',
        href: '/ADMHistoriqueCommande',
        icon: <PiCreditCardDuotone />,
    }


];
