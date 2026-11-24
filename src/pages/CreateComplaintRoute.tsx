import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ComplaintsPage from './ComplaintsPage'
import { useComplaintSheet } from '@/modules/complaints/contexts/complaintSheetContext'

// /create-complaint era uma página inteira; hoje o formulário é um painel que
// entra pela direita. O endereço antigo continua valendo: abre o painel e troca
// a URL pela listagem, que é o que fica na tela atrás dele.
const CreateComplaintRoute: React.FC = () => {

    const { open } = useComplaintSheet()
    const navigate = useNavigate()

    useEffect(() => {
        open()
        navigate('/complaint', { replace: true })
    }, [open, navigate])

    return <ComplaintsPage />
}

export default CreateComplaintRoute
