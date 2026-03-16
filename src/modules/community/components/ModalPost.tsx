import React, { useState } from 'react';
import { X, Image } from '@phosphor-icons/react';

type ModalPostProps = {
    isOpen: boolean;
    onClose: () => void;
    imgUrl?: string | null;
};

const ModalPost: React.FC<ModalPostProps> = ({ isOpen, onClose, imgUrl }) => {

    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = () => {
        setContent('');
        setImage(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full mx-4 p-6 z-10 border border-gray-200 dark:border-gray-800">

                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800'>
                            <img
                                src={imgUrl || 'avatar.png'}
                                alt="User avatar"
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Criar Publicação
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X size={20} weight="bold" />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="O que você está pensando?"
                        className="w-full min-h-32 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-white text-sm leading-relaxed border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors duration-200"
                    />

                    {image && (
                        <div className="relative">
                            <img src={image} alt="Preview" className="w-full rounded-xl" />
                            <button
                                onClick={() => setImage(null)}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors duration-200 cursor-pointer"
                            >
                                <X size={14} weight="bold" className="text-white" />
                            </button>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                        <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                            <Image size={20} weight="bold" />
                            <span className="text-sm font-medium">Adicionar Imagem</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                        </label>

                        <button
                            onClick={handleSubmit}
                            disabled={!content.trim()}
                            className="px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Publicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPost;
