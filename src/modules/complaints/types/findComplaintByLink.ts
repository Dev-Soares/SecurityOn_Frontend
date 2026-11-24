import type { Complaint } from "./complaint";

export interface FindComplaintByLinkResponse {
  // Endereço como foi digitado e host de fato pesquisado, a tela mostra os dois,
  // para o visitante ver que "www.loja.com/produto?utm=x" foi lido como "loja.com".
  query: string;
  domain: string;
  found: boolean;
  total: number;
  data: Complaint[];
}
