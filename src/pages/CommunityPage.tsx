import React, { useState } from 'react'
import Post from '@/modules/community/components/Post'
import { Image } from '@phosphor-icons/react'
import ModalPost from '@/modules/community/components/ModalPost'
import useFindAllPosts from '@/modules/community/hooks/useFindAllPosts'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import PostSkeleton from '@/modules/community/skeletons/PostSkeleton'
import ErrorMessage from '@/shared/utils/ErrorMessage'
import Spinner from '@/shared/utils/Spinner'

const CommunityPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

   const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFindAllPosts()

  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  const posts = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <main className='py-3 px-2 min-h-screen pb-28 md:pb-16 lg:pb-0 lg:py-8 lg:px-8 flex flex-col gap-6 bg-white dark:bg-gray-950'>

      <div className='w-full md:w-[70%] xl:w-[50%] mx-auto mt-4 px-3 md:px-0'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Comunidade</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Compartilhe e conecte-se com outros usuários</p>
      </div>

      <div className='bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 w-full md:w-[70%] xl:w-[50%] mx-auto hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200'>
        <div className='flex flex-row items-center gap-3'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='group flex-1 flex items-center cursor-pointer rounded-full transition-all duration-200'
          >
            <input
              type="text"
              readOnly
              className='w-full h-11 bg-white dark:bg-gray-800 rounded-full px-4 text-gray-950 dark:text-white border border-gray-200 dark:border-gray-700 pointer-events-none cursor-pointer placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors duration-200'
              placeholder="O que você está pensando?"
            />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className='p-2.5 cursor-pointer rounded-full transition-colors duration-200 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200/70 dark:hover:bg-gray-800/70'
          >
            <Image size={22} weight="bold" />
          </button>
        </div>
      </div>
      <ModalPost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <div className='flex flex-col gap-3 justify-center items-center md:gap-5'>
          {isLoading && <PostSkeleton />}

          {isError && (
            <div className="w-full md:w-[70%] xl:w-[50%] mx-auto">
              <ErrorMessage
                message="Não foi possível carregar os posts."
                onRetry={() => refetch()}
              />
            </div>
          )}

          {posts.map((post) => (
            <Post
              key={post.id}
              userId={post.userId}
              content={post.content}
              timestamp={post.createdAt}
              imgUrl={post.imgUrl}
            />
          ))}
        </div>

        <div ref={observerRef} className='flex justify-center py-8'>
          {isFetchingNextPage && (
            <Spinner />
          )}
        </div>

    </main>
  )
}

export default CommunityPage
