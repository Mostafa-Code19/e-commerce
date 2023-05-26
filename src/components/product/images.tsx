'use client'

import Image from 'next/image'
import Lightbox from 'react-spring-lightbox';
import { useState, useEffect } from 'react'

type ImageType = {
    src: string;
    alt: string;
}

const Images = ({ thumbnail, productLocation }: any) => {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [galleryList, setGalleryList] = useState<ImageType[]>([])
    const [currentImageIndex, setCurrentIndex] = useState(0);

    const gotoPrevious = () =>
        currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

    const gotoNext = () =>
        currentImageIndex + 1 < 2 &&  // project.gallery.length
        setCurrentIndex(currentImageIndex + 1);

    useEffect(() => {
        let galleryList: {src: string, alt: string}[] = []
        
        productLocation.map((product: any) => {
            product.color.gallery.map((data: any) => {
                galleryList.push(
                    {
                        src: data.src,
                        alt: data.alt
                    }
                )
            })
        })

        setGalleryList(galleryList)
    }, [productLocation])

    return (
        <div className='space-y-5'>
            <div onClick={() => {
                setLightboxOpen(true)
                setCurrentIndex(0)
            }}>
                <Image
                    className='object-cover justify-center m-auto p-2'
                    src={thumbnail.src}
                    alt={thumbnail.alt}
                    width='500'
                    height='500'
                />
            </div>
            <div className='flex space-x-3 justify-center'>
                {
                    galleryList.map((data: any, index: number) => {
                        return (
                            <div key={index} onClick={() => {
                                setLightboxOpen(true)
                                setCurrentIndex(index)
                            }}>
                                <Image
                                    className='object-cover justify-center m-auto p-2'
                                    src={`${data.src}`}
                                    alt={data.alt}
                                    width='100'
                                    height='100'
                                />
                            </div>
                        )
                    })
                }
            </div>

            <Lightbox
                isOpen={lightboxOpen}
                onPrev={gotoPrevious}
                onNext={gotoNext}
                images={galleryList}
                currentIndex={currentImageIndex}
                /* Add your own UI */
                // renderHeader={() => (<CustomHeader />)}
                // renderFooter={() => (<CustomFooter />)}
                // renderPrevButton={() => (<CustomLeftArrowButton />)}
                // renderNextButton={() => (<CustomRightArrowButton />)}
                // renderImageOverlay={() => (<ImageOverlayComponent >)}

                /* Add styling */
                // className="cool-class"
                style={{ backdropFilter: "blur(10px) brightness(.5)" }}

                /* Handle closing */
                onClose={() => setLightboxOpen(false)}

                /* Use single or double click to zoom */
                // singleClickToZoom

                /* react-spring config for open/close animation */
                // pageTransitionConfig={{
                //   from: { transform: "scale(0.75)", opacity: 0 },
                //   enter: { transform: "scale(1)", opacity: 1 },
                //   leave: { transform: "scale(0.75)", opacity: 0 },
                //   config: { mass: 1, tension: 320, friction: 32 }
                // }}
            />
        </div>
    );
}
 
export default Images;