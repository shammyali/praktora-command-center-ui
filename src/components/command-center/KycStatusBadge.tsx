
import React from "react";

interface KycStatusBadgeProps {
  status: "YES" | "NO" | "PEP" | "Request";
}

const KycStatusBadge = ({ status }: KycStatusBadgeProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "YES":
        return "text-green-600 font-bold";
      case "NO":
        return "text-red-600 font-bold";
      case "PEP":
        return "text-red-600 font-bold animate-pulse";
      case "Request":
        return "text-blue-600 font-bold";
      default:
        return "text-gray-600 font-bold";
    }
  };

  return (
    <div className="inline-flex items-center">
      <span className="text-sm font-medium text-black">KYC - </span>
      {status === "PEP" ? (
        <span className={`text-sm ml-1 text-red-600 font-bold relative`}>
          <span className="animate-pulse">PEP</span>
          <span className="absolute -inset-1 rounded-full bg-red-100 animate-ping opacity-75"></span>
        </span>
      ) : (
        <span className={`text-sm ml-1 ${getStatusColor()}`}>{status}</span>
      )}
    </div>
  );
};

export default KycStatusBadge;
