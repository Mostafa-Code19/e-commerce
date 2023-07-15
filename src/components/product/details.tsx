import BackButton from '@/components/back-btn';
import Images from './images'
import { Product, Image } from '@prisma/client';

type ProductAndLocation = Product & {gallery: Image[]}

const Detail = ({ product }: { product: ProductAndLocation }) => {
    return (
        <>
            <BackButton />

            <Images isAdmin={false} thumbnail={product.gallery[0]} product={product} />

            <h1 style={{ fontSize: '1.75rem' }} className='text-right'>{product.title}</h1>

            <div className='text-right space-y-2'>
                <h2>توضیحات</h2>
                <p>{product.description}</p>
            </div>
        </>
    );
}

export default Detail;