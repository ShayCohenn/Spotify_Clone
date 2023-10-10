import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemsProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemsProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
    flex flex-row 
    h-auto
    items-center
    w-full
    gap-x-4
    font-medium
    text-md
    text-neutral-400
    hover:text-white
    transition
    py-1
    cursor-pointer
    `,
        active && "text-white"
      )}>
      <Icon size={26}/>
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
