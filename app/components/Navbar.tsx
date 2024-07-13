import Link from 'next/link';
import React from 'react';
import NavbarLinks from './NavbarLinks';
import ThemeSwitch from './ThemeSwitch';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import UserNav from './UserNav';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Navbar(){
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className='sticky top-0 backdrop-blur-2xl shadow-sm z-50'>
      <nav className='relative max-w-7xl flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-6'>
        <div className='md:col-span-3'>
            <Link href={"/"}>
              <h1 className='font-semibold text-2xl'>Photo<span className='text-primary font-bold'>HUB</span></h1>
            </Link>
        </div>
        <NavbarLinks />
        <div className='flex items-center gap-x-4 ms-auto col-span-3'>
          <div className='cursor-pointer rounded-full w-6 h-6 flex items-center justify-center'>
            <ThemeSwitch />
          </div>
          {user ? (
            <UserNav
              email={user.email as string}
              name={user.given_name as string}
              userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
            />
          ) : (
            <div className='flex items-center gap-x-2'>
              <Button asChild>
                <LoginLink>Login</LoginLink>
              </Button>
              <Button variant={'secondary'}>
                <RegisterLink>Register</RegisterLink>
              </Button>
            </div>
          )}
          <div className='md:hidden'>
            <MobileMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};

