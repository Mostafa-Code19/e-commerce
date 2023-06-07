import BackButton from '@/components/back-btn';
import Images from './images'

const Detail = ({ product }: any) => {
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