import React from "react";
import { Button } from "@/components/ui/button.tsx";

interface Props extends React.PropsWithChildren {
  saveUserProgress: () => void;
}

export function AuthRequiredButton({ children, saveUserProgress }: Props) {
  // const { isUserAuthenticated } = useContext(AuthContext);
  const isUserAuthenticated = false;

  const handleSave = () => {
    if (isUserAuthenticated) {
      saveUserProgress();
    } else {
      // show Login form ?
      alert("Please log in to save your progress.");
    }
  };

  return <Button onClick={handleSave}>{children}</Button>;
}
