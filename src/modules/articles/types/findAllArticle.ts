import type { Article } from "./article";

export interface FindAllArticleResponse {
  cursor: string | null;
  hasNextPage: boolean;
  articles: Article[];
}
