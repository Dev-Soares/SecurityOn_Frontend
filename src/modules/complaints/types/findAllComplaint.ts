import type { Complaint } from "./complaint";

export interface FindAllComplaintResponse {
  nextCursor: string | null;
  hasNextPage: boolean;
  data: Complaint[];
}
