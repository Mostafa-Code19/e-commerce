import Detail from '../../../components/product/details'
import Options from '../../../components/product/options'
import prisma from '../../../../lib/prisma'


const getProduct = async (slug: string) => {
    return await prisma.product.findUnique(
        {
            where: {
                id: slug
            },
            include: {
                gallery: {
                    select: {
                        src: true,
                        alt: true
                    }
                },
                colors: {
                    select: {
                        color: true
                    }
                },
                sizes: {
                    select: {
                        size: true
                    }
                }
            }
        }
    )
        .then((res: any) => {
            return JSON.parse(JSON.stringify(res))
        })
}

type ProductProps = {
    id: string;
    thumbnail: string;
    title: string;
    price: number
}

const Product = async ({ params }: {params: {slug: string}}) => {
    const product = await getProduct(params.slug)

    console.log('product')
    console.log(product)

    return (
        <Options product={product}>
            <Detail product={product}/>
        </Options>
    );
}
 
export default Product;