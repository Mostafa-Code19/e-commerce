import prisma from '@/lib/prisma';
import S3 from 'aws-sdk/clients/s3';
import { NextResponse } from 'next/server';

interface BodyType {
   productId: string;
   imageName: string;
}

export async function POST(req: Request) {
   const { imageName }: BodyType = await req.json();

   const s3 = new S3({
      region: 'me-central-1',
      endpoint: process.env.LIARA_ENDPOINT,
      accessKeyId: process.env.LIARA_ACCESS_KEY,
      secretAccessKey: process.env.LIARA_SECRET_KEY,
      signatureVersion: 'v4',
   });

   const uniqueId = Math.random().toString(36).substring(2, 7);
   const Key = `${uniqueId}-${imageName}`;

   const params = {
      Bucket: 'tabrizian',
      Key: Key
   };

   const uploadUrl = s3.getSignedUrl('putObject', params)

   return NextResponse.json({ key: Key, uploadUrl });
}
