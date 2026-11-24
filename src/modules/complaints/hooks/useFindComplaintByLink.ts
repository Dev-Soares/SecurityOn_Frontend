import { useQuery } from "@tanstack/react-query";
import { findComplaintByLinkService } from "../service/findComplaintByLinkService";

// Busca só dispara com um endereço submetido: a verificação é um ato do visitante,
// não um filtro que acompanha a digitação.
export const useFindComplaintByLink = (url: string) => {
  return useQuery({
    queryKey: ["complaintByLink", url],
    queryFn: () => findComplaintByLinkService(url),
    enabled: url.trim().length > 0,
    // Resultado de verificação é consultado de novo com frequência (o visitante volta,
    // compara, cola outra URL): manter em cache evita bater no servidor a cada ida e volta.
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export default useFindComplaintByLink;
