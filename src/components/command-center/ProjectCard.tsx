
import { Card, CardContent } from "@/components/ui/card";
import KycStatusBadge from "./KycStatusBadge";

interface ProjectCardProps {
  title: string;
  description: string;
  status?: string;
  statusColor?: "green" | "yellow" | "red" | "blue";
  animate?: boolean;
  customerName: string;
  kycStatus: "YES" | "NO" | "PEP" | "Request";
}

const ProjectCard = ({
  title,
  description,
  status,
  statusColor = "blue",
  animate = false,
  customerName,
  kycStatus
}: ProjectCardProps) => {
  return (
    <Card className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <KycStatusBadge status={kycStatus} />
            {status && (
              <span className={`text-xs font-medium
                ${statusColor === "green" ? "text-green-700" : statusColor === "yellow" ? "text-amber-700" : statusColor === "red" ? "text-red-700" : "text-blue-700"}
                ${animate ? "animate-pulse-slow" : ""}
              `}>
                {status}
              </span>
            )}
          </div>
          <div className="mb-1">
            <h3 className="font-medium">
              {title} <span className="font-bold">{customerName}</span>
            </h3>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
