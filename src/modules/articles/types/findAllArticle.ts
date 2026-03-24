import type { Article } from "./article";

export interface FindAllArticleResponse {
  nextCursor: string | null;
  hasNextPage: boolean;
  data: Article[];
}
