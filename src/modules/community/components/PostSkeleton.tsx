const PostSkeleton = () => {
    return (
        <div className='bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-auto px-6 flex flex-col rounded-2xl gap-4 w-full pt-6 pb-2 md:w-[70%] xl:w-[50%] animate-pulse'>
            <div className='flex flex-row gap-3 items-center'>
                <div className='w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700' />
                <div className='flex flex-col gap-2'>
                    <div className='h-4 w-28 rounded bg-gray-300 dark:bg-gray-700' />
                    <div className='h-3 w-20 rounded bg-gray-300 dark:bg-gray-700' />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='h-4 w-full rounded bg-gray-300 dark:bg-gray-700' />
                <div className='h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-700' />
            </div>
        </div>
    )
}

export default PostSkeleton
