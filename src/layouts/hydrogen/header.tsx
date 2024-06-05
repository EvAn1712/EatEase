'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HamburgerButton from '@/layouts/hamburger-button';
import Sidebar from '@/layouts/hydrogen/sidebar';
import Logo from '@/components/logo';
import HeaderMenuRight from '@/layouts/header-menu-right';
import StickyHeader from '@/layouts/sticky-header';

export default function Header() {
  const pathname = usePathname();

  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8 4xl:px-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/point-of-sale"
            className={`font-lexend font-bold text-4xl me-4 hover:text-gray-900 ${
              pathname === '/point-of-sale' ? 'text-red-600' : 'text-gray-800'
            }`}
          >
            Nos articles
          </Link>
          <Link
            href="/CompositionMenu"
            className={`font-lexend font-bold text-4xl hover:text-gray-900 ${
              pathname === '/CompositionMenu' ? 'text-red-600' : 'text-gray-800'
            }`}
          >
            Nos menus
          </Link>
        </div>
        <div className="flex items-center">
          <HamburgerButton view={<Sidebar className="static w-full 2xl:w-full" />} />
          <Link
            href={'/'}
            aria-label="Site Logo"
            className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
          >
            <Logo iconOnly={true} />
          </Link>
        </div>
        <HeaderMenuRight />
      </div>
    </StickyHeader>
  );
}
