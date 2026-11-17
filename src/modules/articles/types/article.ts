export interface ArticleAuthor {
  id: string;
  name: string;
  avatarUrl?: string | null;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  bgUrl?: string | null;
  userId: string;
  createdAt: string;
  // Autor vem junto do artigo: o feed não precisa de um GET /user por card.
  user: ArticleAuthor;
}
