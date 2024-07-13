"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const navbarLinks = [
    {
        id: 0,
        name: 'Home',
        href: '/'
    },
    {
        id: 1,
        name: 'Photographers',
        href: '/services/photographer'
    },
    {
        id: 2,
        name: 'Filmmakers',
        href: '/services/filmmaker'
    },
    {
        id: 3,
        name: 'AI Artists',
        href: '/services/aiartist'
    },
]

function NavbarLinks() {

    const location = usePathname();

    console.log(location);

  return (
    <div className='hidden md:flex justify-center items-center col-span-6 gap-x-2'>
        {navbarLinks.map((item) => (
            <Link href={item.href} key={item.id} className={cn(
                location === item.href ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75', 'group flex items-center px-4 py-2 font-medium rounded-md'
            )}>
                {item.name}
            </Link>
        ))}
    </div>
  )
}

export default NavbarLinks