
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
        <div className="w-32 h-40 overflow-hidden border-2 border-[#9C2D55] rounded">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${fullName} ${type === "Individual" ? "photo" : "logo"}`}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-2xl font-semibold">{getInitials(fullName)}</span>
            </div>
          )}
        </div>
        <div className="text-xs text-center mt-1 text-muted-foreground">
          {type === "Individual" ? "Passport Photo" : "Company Logo"}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileImage;
