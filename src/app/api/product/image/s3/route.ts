import S3 from 'aws-sdk/clients/s3'
import { NextResponse } from 'next/server'

const s3 = new S3({
   region: 'me-central-1',
   endpoint: process.env.LIARA_ENDPOINT,
   accessKeyId: process.env.LIARA_ACCESS_KEY,
   secretAccessKey: process.env.LIARA_SECRET_KEY,
   signatureVersion: 'v4',
})

export async function POST(req: Request) {
   const { imageName }: { imageName: string } = await req.json()

   const uniqueId = Math.random().toString(36).substring(2, 7)
   const Key = `${uniqueId}-${imageName}`

   const params = {
      Bucket: 'tabrizian',
      Key: Key,
   }

   const uploadUrl = s3.getSignedUrl('putObject', params)

   return NextResponse.json({ key: Key, uploadUrl })
}

export async function DELETE(req: Request) {
   const { imageKey } = await req.json()

   const params = {
      Bucket: 'tabrizian',
      Key: imageKey,
   }

   const resDelete = await s3.deleteObject(params).promise()

   return NextResponse.json({ resDelete })
}
