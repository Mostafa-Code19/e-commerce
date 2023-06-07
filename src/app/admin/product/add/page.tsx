/* eslint-disable @next/next/no-img-element */
'use client'

import React ,{ useEffect, useState, useRef } from 'react'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { MuiColorInput } from 'mui-color-input'
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import User from "@/lib/user";
import BackButton from '@/components/back-btn';

type ProductProps = {
    id: string;
    title: string;
    productLocation: {
        price: number;
        discount: number;
        color: {
            color: string;
            gallery: {
                src: string
                alt: string
            }[]
        }
        size: {
            size: number
        }
    }[]
}

type SelectedCategory = {
    id: {
        id: string|null
    }
}

const AdminProduct = () => {
    // const user = await User()
    
    const [products, setProducts] = useState<ProductProps[]>([])
    const [newProductPanel, setNewProductPanel] = useState<boolean>(false)
    const [selectedProduct, selectProduct] = useState<SelectedCategory>({id: {id: null}})
    const [publicState, setPublic] = useState<boolean>(false)
    const [color, setColor] = useState<string>('#696969')
    const [productImages, setProductImages] = useState<FileList|null>(null)

    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const discountRef = useRef<HTMLInputElement>(null)
    const sizeRef = useRef<HTMLInputElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        await axios.get('/api/product/')
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => {
                toast.error(`دریافت محصولات به مشکل برخورد کرد!`);
                console.log('err fetch products', err)
            })
    }

    const addProductLocation = async () => {
        if (selectedProduct.id.id === null) return toast.warning(`هیچ محصولی انتخاب نشده است!`)
        if (
            !publicState || color == '#696969'|| !sizeRef||
            !quantityRef || !priceRef || !discountRef ||
            !sizeRef.current?.value.length || !quantityRef.current?.value.length ||
            !priceRef.current?.value.length || !discountRef.current?.value.length
        ) return toast.warning('برخی از ورود ها تکمیل نمی‌باشد!')

        const payload = {
            public: publicState,
            productId: selectedProduct.id.id,
            color: color,
            size: sizeRef.current?.value,
            quantity: quantityRef.current?.value,
            price: priceRef.current?.value,
            discount: discountRef.current?.value
        }

        await axios.post(`/api/product/location/add`, payload)
            .then(res => {
                if (res.status === 200) {
                    toast.success(`چهره جدید محصول با موفقیت اضافه شد.`);
                    // enqueueSnackbar('کوییز تریویا با موفقیت ایجاد شد.', { variant: 'success', anchorOrigin: { horizontal: 'right', vertical: 'top' }})
                }
            })
            .catch(err => {
                // enqueueSnackbar('در ایجاد کوییز تریویا خطایی رخ داد.', { variant: 'success', anchorOrigin: { horizontal: 'right', vertical: 'top' }})
                toast.error(`در ثبت چهره جدید محصول خطایی رخ داد!`);
                console.log('err: postTrivia')
                console.log(err)
                console.log(err.response)
            })
    }

    const addNewProduct = async () => {
        await axios.post('/api/product/add', {
            title: titleRef?.current?.value,
            description: descriptionRef?.current?.value
        })
            .then(res => {
                if (res.data.id) {
                    fetchProducts()
                    setNewProductPanel(false)
                    toast.success(`محصول جدید با موفقیت اضافه شد.`);
                }
                else console.log('res add new product', res)
            })
            .catch(err => {
                toast.error(`در ثبت محصول جدید خطایی رخ داد!`);
                console.log('err add new product', err)
            })
    }

    const submitImagesToProduct = async () => {
        if (productImages === null) return toast.warning(`هیچ تصویری برای آپلود انتخاب نشده است!`)
        if (selectedProduct.id.id === null) return toast.warning(`محصول مورد نظر جهت آپلود تصویر انتخاب نشده است!`)

        let imageSources:string[] = []

        Array.from(productImages).map((image: {name: string}) => {
            imageSources.push(image.name)
        })

        const payload = {
            productId: selectedProduct.id.id,
            imageSources: imageSources
        }

        await axios.post('/api/product/image/add', payload)
            .then(res => {
                toast.success(`تصویر با موفقیت آپلود گردید.`)
            })
            .catch(err => {
                toast.error(`در آپلود تصویر خطایی رخ داد!`)
                console.log(err)
            })
    }

    return (
        <>
            {/* {
                // user.role == 'ADMIN' ? */}
                <div className='mx-8'>
                    <div className='flex items-center justify-between'>
                        <BackButton />
                        <h1>افزودن محصول</h1>
                        <span></span>
                    </div>

                    <div className='flex flex-col space-y-3'>

                        <div className='flex space-x-5 w-full'>
                            <button onClick={() => setNewProductPanel(true)}>
                                <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                                </svg>
                            </button>
                            {
                                products &&
                                <Autocomplete
                                    id="productKey"
                                    options={products}
                                    onChange={(e, value:string) => selectProduct({id: value})}
                                    getOptionLabel={(option: ProductProps) => option.title}
                                    renderInput={(params) => <TextField {...params} label="محصول" />}
                                    sx={{width: '100%'}}
                                />
                            }
                        </div>
                        
                        <Dialog onClose={() => setNewProductPanel(false)} open={newProductPanel}>
                            <input type="text" placeholder='عنوان' ref={titleRef} className='px-6 py-1 text-right text-base' />
                            <textarea placeholder='توضیحات' ref={descriptionRef} cols={30} rows={10} className='pl-4 pr-6 py-1 border border-[#8C939D] rounded text-right bg-transparent text-[0.9rem] my-auto pt-3'></textarea>
                            <button onClick={addNewProduct} >ثبت محصول</button>
                        </Dialog>

                        <hr />

                        <Button
                            variant="outlined"
                            component="label"
                        >
                            <h5>تصاویر محصول</h5>
                            <input
                                hidden accept="image/*" type="file"
                                onChange={e => setProductImages(e.target.files)}
                                multiple
                            />
                        </Button>

                        <div>
                            {
                                productImages &&
                                Object.keys(productImages).map((image: any) => {
                                    image = productImages[image]
                                    return (
                                        <img
                                            key={image.id}
                                            className='my-5 w-60 mx-auto'
                                            src={URL.createObjectURL(image)} alt=""
                                        />
                                    ) 
                                })
                            }
                        </div>

                        <button
                            className='w-full px-5 py-3 mt-10 border border-green-500 rounded hover:text-black hover:bg-green-500'
                            onClick={submitImagesToProduct}
                        >
                            ثبت تصاویر
                        </button>

                        <hr />

                        <div className='flex justify-end'>
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={() => { setPublic(publicState ? false : true) }}
                                    />
                                }
                                label={<h5>عمومی</h5>}
                            />
                        </div>

                        <input type="number" placeholder='قیمت به تومان' ref={priceRef} className='px-6 py-1 text-right text-base' />
                        <input type="number" placeholder='تخفیف به درصد' ref={discountRef} className='px-6 py-1 text-right text-base' />
                        <input type="number" placeholder='سایز' ref={sizeRef} className='px-6 py-1 text-right text-base' />
                        <input type="number" placeholder='تعداد موجود' ref={quantityRef} className='px-6 py-1 text-right text-base' />

                        <div className='flex justify-between items-center'>
                            <MuiColorInput
                                value={color}
                                format="hex"
                                onChange={(e) => setColor(e)}
                            />
                            <h5>رنگ چهره محصول</h5>
                        </div>

                    </div>

                    <button
                        className='w-full px-5 py-3 mt-10 border border-green-500 rounded hover:text-black hover:bg-green-500'
                        onClick={addProductLocation}
                    >
                        افزودن
                    </button>
                </div>
            {/* } */}
        </>
    );
}

export default AdminProduct;