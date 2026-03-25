import React from 'react'
import { useFindComplaintByUser } from '@/modules/complaints/hooks/useFindComplaintByUser'
import ComplaintCard from '@/modules/complaints/components/ComplaintCard'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import Spinner from '@/shared/components/Spinner'

interface ProfileComplaintsProps {
    userId: string | undefined
}

const ProfileComplaints: React.FC<ProfileComplaintsProps> = ({ userId }) => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFindComplaintByUser(userId!)

    const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

    const complaints = data?.pages.flatMap(page => page.data) ?? []

    if (complaints.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-16 gap-2'>
                <p className='text-gray-400 dark:text-gray-500 text-base'>Nenhuma denúncia feita</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center gap-4 w-full py-4 px-4'>
            {complaints.map(complaint => (
                <ComplaintCard
                    key={complaint.id}
                    title={complaint.title}
                    content={complaint.content}
                    date={complaint.createdAt}
                    danger={complaint.danger}
                    store={complaint.store}
                    link={complaint.link}
                />
            ))}
            <div ref={observerRef} className='flex justify-center py-8'>
                {isFetchingNextPage && <Spinner  />}
            </div>
        </div>
    )
}

export default ProfileComplaints
