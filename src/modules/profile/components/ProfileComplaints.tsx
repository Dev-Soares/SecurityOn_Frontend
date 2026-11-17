import React from 'react'
import { Flag } from '@phosphor-icons/react'
import { useFindComplaintByUser } from '@/modules/complaints/hooks/useFindComplaintByUser'
import ComplaintCard from '@/modules/complaints/components/ComplaintCard'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import Spinner from '@/shared/components/Spinner'
import EmptyState from '@/shared/components/EmptyState'

interface ProfileComplaintsProps {
    userId: string | undefined
}

const ProfileComplaints: React.FC<ProfileComplaintsProps> = ({ userId }) => {

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFindComplaintByUser(userId!)

    const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

    const complaints = data?.pages.flatMap(page => page.data) ?? []

    if (isLoading) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner />
            </div>
        )
    }

    if (complaints.length === 0) {
        return (
            <EmptyState
                icon={<Flag size={40} weight='light' />}
                title='Nenhuma denúncia feita'
                description='As lojas e golpes denunciados por este perfil aparecem aqui.'
            />
        )
    }

    return (
        <div className='flex flex-col gap-3 w-full'>
            {complaints.map(complaint => (
                <ComplaintCard key={complaint.id} complaint={complaint} variant='compact' />
            ))}
            <div ref={observerRef} className='flex justify-center py-6'>
                {isFetchingNextPage && <Spinner />}
            </div>
        </div>
    )
}

export default ProfileComplaints
