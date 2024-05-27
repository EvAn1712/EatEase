import { metaObject } from '@/config/site.config';
import PointOfSalePage from './point-of-sale/page';
import LoginPage from './Connexion/page';
import ADMAjoutPrduit from './ADMAjoutProduit/page';
import MonProfile from './MonProfile/page';
import HistoriqueCommande from '@/app/(main)/HistoriqueCommande/page';
import Stock from './ADMStock/page';
import ListProduit from './ADMListProduit/page';
export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  
  return <PointOfSalePage />;
}
