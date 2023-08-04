const LoadingHome = () => {
   return (
      <div className='mx-auto my-16 animate-pulse max-w-screen-md space-y-4'>
         <div className='w-full h-40 bg-gray-200 rounded'></div>
         <div className='w-full h-20 bg-gray-200 rounded'></div>
         <div className='w-full h-10 bg-gray-200 rounded'></div>

         <div className='grid grid-cols-2'>
            <div className='w-45 h-40 bg-gray-200 mr-3 mb-3 rounded'></div>
            <div className='w-45 h-40 bg-gray-200 mb-3 rounded'></div>
            <div className='w-45 h-40 bg-gray-200 mr-3 rounded'></div>
            <div className='w-45 h-40 bg-gray-200 rounded'></div>
         </div>
      </div>
   )
}

export default LoadingHome
