'use client';

import { Title, Text, Avatar, Button, Popover } from 'rizzui';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthContextType, auth, useAuthContext } from '@/app/(main)/authContext';
import { signOut } from 'firebase/auth';

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  const { user } = useAuthContext() as AuthContextType;

  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
        
          className={cn(
            'w-20 sm:w-28 p-2 shrink-0 bg-primary text-white my-2 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px',
          buttonClassName
          )}
        >
          {user? <Text >Session</Text>:<Text >S'authentifier</Text>}
          
         
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

function DropdownMenu() {
  const { user } = useAuthContext() as AuthContextType;

  const logout = async () => {
    await signOut(auth);
  };

  // Éléments de menu conditionnels en fonction de l'état de connexion de l'utilisateur
  const menuItems = user
    ? [
        { name: 'Se déconnecter', action: logout },
      ]
    : [
        { name: 'Se connecter', href: '/Connexion' },
        { name: "S'inscrire", href: '/Inscription' }

      ];

  return (
    <div className="w-64 text-left rtl:text-right">
      {user ? (
        <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
          <Avatar
            src={user.photoURL || "https://example.com/default-avatar.png"}
            name={user.email || "Utilisateur"}
          />
          <div className="ms-3">
            <Title as="h6" className="font-semibold">
              {user.displayName || "Utilisateur"}
            </Title>
            <Text className="text-gray-600">{user.email}</Text>
          </div>
        </div>
      ) : null}
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}

            //@ts-ignore
            href={item.href || '#'}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
             //@ts-ignore
            onClick={item.action || (() => {})}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

