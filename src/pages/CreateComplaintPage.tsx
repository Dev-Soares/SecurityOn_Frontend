import React from 'react'
import Waves from '@/shared/components/Waves'
import CreateComplaintForm from '@/modules/complaints/components/CreateComplaintForm'


const CreateComplaintPage: React.FC = () => {

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            <div className='bg-linear-to-r from-blue-700 to-blue-900 flex flex-col lg:flex-row h-full'>
                <Waves title="Fazer Denúncia" />

                <div className='flex flex-col justify-start items-center z-10 w-full bg-white dark:bg-gray-950 rounded-t-3xl md:rounded-t-4xl lg:rounded-t-none lg:w-[50%] lg:h-screen lg:overflow-y-auto'>
                    <div className='w-full max-w-md px-6 lg:px-8 py-10 lg:py-12'>
                        <div className='flex flex-col gap-1 lg:gap-2 mb-8'>
                            <h1 className='text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white'>Fazer Denúncia</h1>
                            <p className='text-sm lg:text-lg text-gray-500 dark:text-gray-400'>Ajude a comunidade reportando golpes e fraudes</p>
                        </div>

                        <CreateComplaintForm />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CreateComplaintPage
