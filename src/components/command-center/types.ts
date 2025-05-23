
export type MessageType = {
  role: "user" | "assistant";
  content: string;
};

export interface ActiveEngagement {
  title: string;
  customerName: string;
  description: string;
  status: string;
  statusColor: "green" | "yellow" | "red" | "blue";
  animate: boolean;
  kycStatus: "YES" | "NO" | "PEP" | "Request";
}
