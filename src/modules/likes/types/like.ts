// Resposta das mutações de curtida: já traz o novo total, então o cliente não
// precisa de uma requisição de follow-up só para atualizar o contador.
export interface LikeStatus {
  postId: string;
  total: number;
  liked: boolean;
}
