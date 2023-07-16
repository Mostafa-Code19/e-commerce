'use client'

import Image from 'next/image'
import Lightbox from 'react-spring-lightbox';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ImageType = {
    id: string;
    src: string;
    alt: string;
}

type PropsType = {
    isAdmin: boolean
    thumbnail: {
        src: string
        alt: string
    }
    product: {
        gallery: {
            id: string
            src: string
            alt: string
        }[]
    }
}


const Images = ({ isAdmin, thumbnail, product }: PropsType) => {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [galleryList, setGalleryList] = useState<ImageType[]>([])
    const [currentImageIndex, setCurrentIndex] = useState(0);

    const gotoPrevious = () =>
        currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

    const gotoNext = () =>
        currentImageIndex + 1 < 2 &&  // project.gallery.length
        setCurrentIndex(currentImageIndex + 1);

    useEffect(() => {
        let galleryList: { id: string, src: string, alt: string }[] = []

        product.gallery.map(img => {
            galleryList.push(
                {
                    id: img.id,
                    src: img.src,
                    alt: img.alt
                }
            )
        })

        setGalleryList(galleryList)
    }, [product])

    const deleteButton = () => {
        if (!isAdmin) return

        const payload = { imageId: galleryList[currentImageIndex]?.id }

        const deleteImage = async () => {
            await axios.post('/api/product/image/delete', payload)
                .then(res => {
                    toast.success('تصویر با موفقیت حذف گردید.');
                    // console.log(res)
                })
                .catch(err => {
                    toast.error('تصویر موجود نمی باشد یا در حذف تصویر خطایی رخ داد!');
                    console.log(err)
                })
        }

        return (
            <button onClick={() => deleteImage()}>
                <div className='py-2 bg-white rounded-full justify-center flex'>
                    <svg className="h-8 w-8 text-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
                </div>
            </button>
        )
    }

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
                    galleryList.map((data, index) => {
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
                renderHeader={deleteButton}
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