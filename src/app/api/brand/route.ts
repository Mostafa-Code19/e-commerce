import { Brand } from '@prisma/client';
import prisma from '@/lib/prisma';

import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
   try {
      const res = await prisma.brand.findMany();
      return NextResponse.json(res);
   } catch (err) {
      console.log('api/brand err:', err);
      return NextResponse.json(err);
   }
}
