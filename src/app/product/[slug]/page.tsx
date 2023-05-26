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
                productLocation: {
                    include: {
                        color: {
                            select: {
                                color: true,
                                gallery: {
                                    select: {
                                        src: true,
                                        alt: true
                                    }
                                }
                            }
                        },
                        size: {
                            select: {
                                size: true
                            }
                        }
                    }
                }
            }
        }
    )
        .then((res: any) => {
            return JSON.parse(JSON.stringify(res))
        })
}

// type ProductProps = {
//     id: string;
//     thumbnail: string;
//     title: string;
//     price: number
// }

const Product = async ({ params }: {params: {slug: string}}) => {
    const product = await getProduct(params.slug)

    return (
        <Options productLocation={product.productLocation}>
            <Detail product={product}/>
        </Options>
    );
}
 
export default Product;