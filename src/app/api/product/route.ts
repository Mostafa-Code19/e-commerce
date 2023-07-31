import { Product } from '@prisma/client';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
   const products = await prisma.product
      .findMany()
      .then((res: Product[]) => res)
      .catch((err: Error) => console.log('err products api', err));

   return NextResponse.json(products);
}
