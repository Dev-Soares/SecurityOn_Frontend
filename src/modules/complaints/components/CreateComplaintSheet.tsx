import React from 'react'
import Sheet from '@/shared/components/Sheet'
import CreateComplaintForm from './CreateComplaintForm'
import { useComplaintSheet } from '../contexts/complaintSheetContext'

// Montado uma vez na casca do app. Fechado, não renderiza nada — é o que zera o
// formulário entre uma abertura e outra, sem precisar limpar campo por campo.
const CreateComplaintSheet: React.FC = () => {

    const { isOpen, close } = useComplaintSheet()

    return (
        <Sheet
            isOpen={isOpen}
            onClose={close}
            title='Fazer denúncia'
            description='Seu relato é o que a próxima pessoa vê antes de pagar.'
        >
            <CreateComplaintForm onPublished={close} />
        </Sheet>
    )
}

export default CreateComplaintSheet
