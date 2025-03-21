import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Loader } from "lucide-react";

interface Props extends React.PropsWithChildren {
  saveUserProgress: () => void;
}

export function AuthRequiredButton({ children, saveUserProgress }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  // const { isUserAuthenticated } = useContext(AuthContext);
  const isUserAuthenticated = true;

  // re=think how t is going to work
  const handleSave = () => {
    if (isUserAuthenticated) {
      saveUserProgress();
      setIsSaving(true);
    } else {
      // show Login form ?
      alert("Please log in to save your progress.");
    }
  };

  return (
    <Button
      className="w-full mt-2 text-contrastReversed hover:bg-purple dark:text-white dark:hover:text-black dark:hover:bg-contrast focus-visible:bg-focusVisible"
      onClick={handleSave}
    >
      {isSaving ? (
        <>
          <Loader className=" animate-spin" />
          Saving...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
