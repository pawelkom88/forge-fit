import { useState, ReactNode } from "react";
import Sidebar from "./sidebar.tsx";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle.tsx";

interface Props {
  children: ReactNode;
}

export default function Main({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-foreground">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background shadow-sm lg:hidden flex py-4 px-4">
          <div className="max-w-7xl flex-grow self-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-textContrast focus:outline-none focus:text-gray-600 mt-2"
            >
              <Menu size={24} />
            </button>
          </div>
          <ModeToggle />
        </header>
        <main className="bg-background flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
