import { useUser } from "@/shared/contexts/userContext";
import { useFindReceivedRequests } from "./useFindReceivedRequests";

// A API pagina os pedidos e não devolve total, então o selo conta o que já veio
// e marca "+" quando ainda há página seguinte. Mesma queryKey da aba Amigos:
// o react-query reaproveita a resposta em vez de buscar de novo.
export const usePendingRequestsBadge = (): string | null => {
  const { isLogged } = useUser();

  const { data } = useFindReceivedRequests(isLogged);

  const pages = data?.pages ?? [];
  const count = pages.reduce((total, page) => total + page.data.length, 0);

  if (count === 0) return null;

  const hasMore = pages[pages.length - 1]?.hasNextPage ?? false;

  return hasMore ? `${count}+` : String(count);
};

export default usePendingRequestsBadge;
