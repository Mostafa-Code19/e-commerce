import BackButton from '@/components/back-btn';
import Images from './images'

const Detail = async ({ product }: any) => {
    return (
        <>
            <BackButton />

            <Images thumbnail={product.productLocation[0].color.gallery[0]} productLocation={product.productLocation} />

            <h1 style={{ fontSize: '1.75rem' }} className='text-right'>{product.title}</h1>

            <div className='text-right space-y-2'>
                <h2>توضیحات</h2>
                <p>{product.description}</p>
            </div>
        </>
    );
}

export default Detail;