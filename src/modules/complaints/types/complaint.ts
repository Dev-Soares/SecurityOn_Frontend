import type { DangerType } from "../config/dangerConfig";

export interface Complaint {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  danger?: DangerType;
  store?: string;
  link?: string;
}
