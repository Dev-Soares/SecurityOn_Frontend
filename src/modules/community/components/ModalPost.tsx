import React from "react";
import CreatePostForm from "./CreatePostForm";
import { X } from "@phosphor-icons/react";
import { useModalPost } from "../contexts/modalPostContext";

const ModalPost: React.FC = () => {

    const { isOpen, close } = useModalPost()

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={close}
            />

            <div className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full mx-4 p-6 z-10 border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-5">
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800'>
                            <img
                                src={'avatar.png'}
                                alt="User avatar"
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Criar Publicação
                        </h2>
                    </div>

                    <button
                        onClick={close}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X size={20} weight="bold" />
                    </button>
                </div>
                <CreatePostForm />

            </div>
        </div>
    );
};

export default ModalPost;
