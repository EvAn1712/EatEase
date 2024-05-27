'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import { menuItems } from '@/layouts/hydrogen/menu-items';
import { AuthContextType, useAuthContext } from '@/app/(main)/authContext';

export const SidebarMenu = () => {
  const pathname = usePathname();
  const { user } = useAuthContext() as AuthContextType;
  const email = user?.email || '';

  const getDomainFromEmail = (email: string): string => {
    return email.split('@')[1];
  };

  const userDomain = email ? getDomainFromEmail(email) : '';

  // Log to verify values
  console.log('User Email:', email);
  console.log('User Domain:', userDomain);

  return (
    <div className="mt-4 pb-3 3xl:mt-6">
      {menuItems.map((item, index) => {
        const isActive = pathname === (item?.href as string);

        // Check if the user domain is allowed to view the item
        if (item.allowedDomains && !item.allowedDomains.includes(userDomain)) {
          return null;
        }

        return (
          <Fragment key={item.name + '-' + index}>
            {item?.href ? (
              <Link
                href={item?.href}
                className={cn(
                  'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                  isActive
                    ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                    : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                )}
              >
                <div className="flex items-center truncate">
                  {item?.icon && (
                    <span
                      className={cn(
                        'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                        isActive
                          ? 'text-primary'
                          : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                      )}
                    >
                      {item?.icon}
                    </span>
                  )}
                  <span className="truncate">{item.name}</span>
                </div>
              </Link>
            ) : (
              <Title
                as="h6"
                className={cn(
                  'mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8',
                  index !== 0 && 'mt-6 3xl:mt-7'
                )}
              >
                {item.name}
              </Title>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default SidebarMenu;