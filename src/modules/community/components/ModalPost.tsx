import React, { useState } from 'react';
import { XIcon, ImageIcon } from '@phosphor-icons/react';

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
                className="absolute inset-0 bg-gray-950/25 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-md max-w-lg w-full mx-4 p-6 z-10">

                <div className="flex justify-between items-center mb-4">
                    <div className='w-full flex items-center gap-4'>
                        <img src={imgUrl || 'avatar.png'} alt="User avatar" className='rounded-full w-12 h-12 object-cover border-gray-300 border-2' />
                        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
                            Criar Publicação
                        </h2>


                    </div>

                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                        <XIcon size={24} weight="regular" className="text-gray-600 dark:text-gray-300" />
                    </button>
                </div>


                <div className="space-y-4">

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="O que você está pensando?"
                        className="w-full min-h-32 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-950 dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 resize-none"
                    />

                    {image && (
                        <div className="relative">
                            <img src={image} alt="Preview" className="w-full rounded-lg" />
                            <button
                                onClick={() => setImage(null)}
                                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
                            >
                                <XIcon size={16} weight="regular" className="text-white" />
                            </button>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <label className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                            <ImageIcon size={20} weight="regular" className="text-blue-600 dark:text-blue-400" />
                            <span className="text-gray-700 dark:text-gray-200">Adicionar Imagem</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"

                            />
                        </label>

                        <button
                            onClick={handleSubmit}
                            disabled={!content.trim()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer hover:translate-y-[-2px]"
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
