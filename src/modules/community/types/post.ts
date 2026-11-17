export interface PostAuthor {
  id: string;
  name: string;
}

export interface PostCounts {
  likes: number;
  comments: number;
}

export interface Post {
  id: string;
  content: string;
  userId: string;
  imgUrl?: string | null;
  createdAt: string;
  // Autor vem junto do post: o feed não precisa de um GET /user por card.
  user: PostAuthor;
  _count: PostCounts;
  // "Curtido por mim" — falso para visitante não autenticado.
  liked: boolean;
}
