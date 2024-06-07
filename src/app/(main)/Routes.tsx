import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PointOfSalePage from './point-of-sale/page';
import LoginPage from './Connexion/page';
import ADMAjoutPrduit from './ADMAjoutProduit/page';
import MonProfile from './MonProfile/page';
import HistoriqueCommande from '@/app/(main)/HistoriqueCommande/page';
import Stock from './ADMStock/page';
import ListProduit from './ADMListProduit/page';
import ADMHistoriqueCommande from './ADMHistoriqueCommande/page';
import CompositionMenuNew from "./CompositionMenuNew/page";

const RoutesComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/point-of-sale" element={<PointOfSalePage/>} />
                
                <Route path="/ajout-produit" element={<ADMAjoutPrduit/>} />
                <Route path="/mon-profile" element={<MonProfile/>} />
                <Route path="/historique-commande" element={<HistoriqueCommande/>} />
                <Route path="/stock" element={<Stock/>} />
                <Route path="/liste-produit" element={<ListProduit/>} />
                <Route path="/historique-commande2" element={<ADMHistoriqueCommande/>} />
                <Route path="/composition-menu" element={<CompositionMenuNew/>} />

                {/* Ajoutez d'autres routes au besoin */}
            </Routes>
        </Router>
    );
};

export default Routes;
