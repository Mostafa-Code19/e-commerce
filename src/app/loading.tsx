const LoadingHome = () => {
   return (
      <div className='mx-6 my-16 animate-pulse space-y-4'>
         <div className='w-full h-40 bg-gray-300 rounded'></div>
         <div className='w-full h-20 bg-gray-300 rounded'></div>
         <div className='w-full h-10 bg-gray-300 rounded'></div>

         <div className='grid grid-cols-2 space-x-3 space-y-3'>
            <div className='w-45 h-40 bg-gray-300 rounded'></div>
            <div className='w-45 h-40 bg-gray-300 rounded'></div>
            <div className='w-45 h-40 bg-gray-300 rounded'></div>
            <div className='w-45 h-40 bg-gray-300 rounded'></div>
         </div>
      </div>
   )
}

export default LoadingHome
