type Dados = {
    title: string
    text: string
    url: string
}


export const shareLink = async (dados: Dados) => {
    if (navigator.share) {
        try {
            await navigator.share(dados);
            console.log('Compartilhado com sucesso!');
        } catch (error) {
            console.error('Erro ao compartilhar:', error);
        }
    }
}