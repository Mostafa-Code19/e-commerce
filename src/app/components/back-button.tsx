'use client'

import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();

    return (
        <button onClick={() => router.back()}>
            <svg className="h-8 w-8 mt-6 text-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </button>
    );
}
 
export default BackButton;