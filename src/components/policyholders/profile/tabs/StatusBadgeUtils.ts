
// Shared utility for generating status badge colors
export const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "ACTIVE":
      return "bg-green-500";
    case "RENEWED":
      return "bg-purple-500";
    case "CANCELLED":
      return "bg-red-500";
    case "LAPSED":
      return "bg-gray-500";
    case "NOT TO BE RENEWED":
      return "bg-amber-500";
    case "IN PROCESS":
      return "bg-blue-500";
    case "QUOTED":
      return "bg-cyan-500";
    case "LOST":
      return "bg-red-500";
    case "CONVERTED":
      return "bg-green-500";
    case "IN PROGRESS":
      return "bg-blue-500";
    case "SETTLED":
      return "bg-green-500";
    case "REJECTED":
      return "bg-red-500";
    case "FNOL":
      return "bg-amber-500";
    case "PARTIAL":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};
