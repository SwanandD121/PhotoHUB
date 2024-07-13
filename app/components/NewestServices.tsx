import React from 'react'
import prisma from '../lib/db';
import Link from 'next/link';
import { ProductCard } from './ProductCard';

async function getData() {
    const data = await prisma.service.findMany({
      select: {
        price: true,
        smallDescription: true,
        category: true,
        name: true,
        id: true,
        images: true,
      },
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return data;
}
  
export default async function NewestServices() {
    const data = await getData();

  return (
    <div>
        <section className='mt-12'>
            <div className="md:flex md:items-center md:justify-between">
                <h2 className='text-2xl font-extrabold tracking-tight'>Newest Services</h2>
                <Link href="#" className='text-sm hidden font-medium text-primary hover:text-primary/80 transition-all md:block'>
                    All Services <span>&rarr;</span>
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
            {data.map((product) => (
              <ProductCard
                images={product.images}
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                smallDescription={product.smallDescription}
              />
        ))}
            </div>
        </section>
    </div>
  )
}

