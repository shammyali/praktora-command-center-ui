
import { CommandIdentityProvider } from "./command-identity/CommandIdentityProvider";
import CommandPopover from "./command-identity/CommandPopover";

const CommandIdentityTrigger = () => {
  return (
    <CommandIdentityProvider>
      <CommandPopover />
    </CommandIdentityProvider>
  );
};

export default CommandIdentityTrigger;
