import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import CartButton from '@/components/cart/CartButton'; 
export default function HeaderMenuRight() {
  const totalItems = 5; // Exemple, remplacez par le nombre réel d'articles dans le panier

  return (
    <div className="ms-auto grid shrink-0 grid-cols-3 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <SettingsButton />
      <CartButton totalItems={totalItems} />
      <ProfileMenu />
    </div>
  );
}
