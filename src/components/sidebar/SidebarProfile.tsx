
const SidebarProfile = () => {
  return (
    <div className="mt-auto border-t border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-praktora-burgundy text-white flex items-center justify-center font-medium">
          BP
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Broker Profile</span>
          <span className="text-xs text-gray-500">broker@praktora.com</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
