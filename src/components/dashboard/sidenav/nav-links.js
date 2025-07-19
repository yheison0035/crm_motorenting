'use client';

import {
  UserGroupIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    name: 'Clientes',
    href: '/CRM/dashboard/customers',
    icon: UsersIcon,
  },
  {
    name: 'Asesores',
    href: '/CRM/dashboard/advisors',
    icon: UserGroupIcon,
  },
  {
    name: 'Cerrar Sesión',
    href: '/CRM',
    icon: ArrowLeftOnRectangleIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-full px-6 space-y-4">
      {links.map((link) => {
        const LinkIcon = link.icon;

        const isActive =
          link.name === 'Cerrar Sesión'
            ? pathname === link.href
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition
              ${
                isActive
                  ? 'bg-sky-100 text-gray-800'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
          >
            <LinkIcon className="w-6 h-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}
