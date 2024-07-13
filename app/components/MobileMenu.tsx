"use client"
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import { navbarLinks } from './NavbarLinks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileMenu = () => {
    const location = usePathname();

    console.log(location);
  return (
    <div>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                    <Menu className='w-4 h-4'/>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <div className='mt-5 flex flex-col px-2 space-y-1 '>
                {navbarLinks.map((item) => (
            <Link href={item.href} key={item.id} className={cn(
                location === item.href ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75', 'group flex items-center px-4 py-2 font-medium rounded-md'
            )}>
                {item.name}
            </Link>
        ))}
                </div>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileMenu