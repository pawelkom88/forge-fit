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
      className="w-full mt-2 text-contrastReversed hover:text-contrast hover:bg-contrastReversed border-2 border-contrast focus-visible:bg-yellow-500"
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
