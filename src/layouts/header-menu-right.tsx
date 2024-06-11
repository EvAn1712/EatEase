
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';

export default function HeaderMenuRight() {
  return (
    <div className="ms-auto grid shrink-0 grid-cols-2 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      
      <SettingsButton />
      <ProfileMenu />
    </div>
  );
}
