import BackButton from '@/components/back-button';
import Images from './images'

const Detail = async ({ product }: any) => {
    return (
        <>
            <BackButton />

            <Images thumbnail={product.thumbnail} sources={product.gallery} />

            <h1 style={{ fontSize: '1.75rem' }}>{product.title}</h1>

            <div>
                <h2>Description</h2>
                <p>{product.description}</p>
            </div>
        </>
    );
}

export default Detail;