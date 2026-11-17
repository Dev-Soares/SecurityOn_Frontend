import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import type { Post } from "../types/post";
import type { FindAllPostResponse } from "../types/findAllPost";

type PostPages = InfiniteData<FindAllPostResponse, string | null>;

// O mesmo post vive em dois caches: o feed ("posts") e o perfil ("userPost").
// Curtir ou comentar num deles tem que aparecer no outro sem refetch.
const isPostCache = (key: readonly unknown[]) =>
  key[0] === "posts" || key[0] === "userPost";

export const patchPostInCaches = (
  queryClient: QueryClient,
  postId: string,
  patch: (post: Post) => Post,
) => {
  queryClient.setQueriesData<PostPages>(
    { predicate: (query) => isPostCache(query.queryKey) },
    (old) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          data: page.data.map((post) =>
            post.id === postId ? patch(post) : post,
          ),
        })),
      };
    },
  );
};

// Usado quando a mutação falha: o cache ficou com o palpite otimista, então
// o servidor volta a ser a fonte da verdade.
export const invalidatePostCaches = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({
    predicate: (query) => isPostCache(query.queryKey),
  });
