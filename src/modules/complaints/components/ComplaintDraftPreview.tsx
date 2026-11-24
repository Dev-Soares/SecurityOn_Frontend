import React, { useMemo, useState } from 'react'
import ComplaintCard from './ComplaintCard'
import type { Complaint } from '../types/complaint'
import type { DangerType } from '../config/dangerConfig'

export interface ComplaintDraft {
    title: string
    store: string
    content: string
    link: string
    danger?: DangerType
}

interface ComplaintDraftPreviewProps {
    draft: ComplaintDraft
}

// O que este formulário entrega é um card no feed. A prévia monta o ComplaintCard
// de verdade, não uma imitação, então o nível de perigo, o domínio e o corte do
// "ver mais" aparecem aqui exatamente como a comunidade vai ler.
const ComplaintDraftPreview: React.FC<ComplaintDraftPreviewProps> = ({ draft }) => {

    // Data fixada na montagem: a prévia mostra "agora" sem refazer a conta a cada tecla.
    const [createdAt] = useState(() => new Date().toISOString())

    const store = draft.store.trim()
    const link = draft.link.trim()
    const title = draft.title.trim()
    const content = draft.content.trim()

    const complaint = useMemo<Complaint>(() => ({
        id: 'draft',
        userId: 'draft',
        createdAt,
        title: title || 'Título da denúncia',
        content: content || 'O relato entra aqui conforme você escreve.',
        store: store || undefined,
        link: link || undefined,
        danger: draft.danger,
    }), [title, content, store, link, draft.danger, createdAt])

    if (!title && !content && !store && !link) {
        return (
            <p className='rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
                Escreva e a denúncia aparece aqui do jeito que a comunidade vai ler.
            </p>
        )
    }

    // inert: o card tem botões de compartilhar e copiar link. Numa prévia eles não
    // têm o que compartilhar, e deixá-los clicáveis ou focáveis só engana.
    return (
        <div inert>
            <ComplaintCard complaint={complaint} variant='compact' />
        </div>
    )
}

export default ComplaintDraftPreview
