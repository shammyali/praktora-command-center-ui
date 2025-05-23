
interface CustomerProfileImageProps {
  profileImage?: string;
  fullName: string;
  type: "Individual" | "Company";
}

const CustomerProfileImage = ({ profileImage, fullName, type }: CustomerProfileImageProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex-shrink-0">
        <div className="w-20 h-20 overflow-hidden border-2 border-[#9C2D55] rounded-full">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${fullName} ${type === "Individual" ? "photo" : "logo"}`}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-xl font-semibold">{getInitials(fullName)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileImage;
