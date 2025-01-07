import { Home, Calendar, Activity, Settings, X } from "lucide-react";
import React from "react";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <>
      <Overlay open={open} setOpen={setOpen} />
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background shadow-md transform transition-transform lg:translate-x-0 lg:static lg:inset-0 border-r border-opacity-5 pr-2  ${
          open
            ? "translate-x-0 ease-out duration-300"
            : "-translate-x-full ease-in duration-200"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-primary-foreground">
            GymTrack
          </h1>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-8">
          <NavItem href="/" icon={<Home size={20} />} text="Dashboard" />
          <NavItem
            href="/calendar"
            icon={<Calendar size={20} />}
            text="Calendar"
            active
          />
          <NavItem
            href="/progress"
            icon={<Activity size={20} />}
            text="Progress"
          />
          <NavItem
            href="/settings"
            icon={<Settings size={20} />}
            text="Settings"
          />
        </nav>
      </div>
    </>
  );
}

function NavItem({
  href,
  icon,
  text,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}) {
  return (
    // todo: change to react router link
    <a
      href={href}
      className={`flex items-center px-4 py-3 text-[var(--background)] ${active ? "rounded-r-xl bg-primary hover:bg-secondary" : "hover:bg-accent"}`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </a>
  );
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Overlay({ open, setOpen }: Props) {
  return (
    <div
      className={`${
        open
          ? "opacity-100 ease-out duration-300 fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity lg:hidden z-10"
          : "opacity-0 ease-in duration-200"
      }`}
      onClick={() => setOpen(false)}
    ></div>
  );
}
