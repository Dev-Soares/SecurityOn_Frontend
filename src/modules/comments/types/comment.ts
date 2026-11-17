export interface CommentAuthor {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: string;
  user: CommentAuthor;
}

export interface FindCommentsByPostResponse {
  nextCursor: string | null;
  hasNextPage: boolean;
  data: Comment[];
}
