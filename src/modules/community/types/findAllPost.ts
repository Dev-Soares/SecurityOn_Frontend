import type { Post } from "./post";

export interface FindAllPostResponse {
  nextCursor: string | null;
  hasNextPage: boolean;
  data: Post[];
}
