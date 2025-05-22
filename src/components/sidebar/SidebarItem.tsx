
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string | number;
  dots?: number;
  redDot?: boolean;
  greenDot?: boolean;
  onClick?: () => void;
  to?: string;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  badge, 
  dots, 
  redDot, 
  greenDot, 
  onClick, 
  to 
}: SidebarItemProps) => {
  const content = (
    <>
      <Icon className={cn("h-5 w-5", active && "text-[#9C2D55]")} />
      <span className="flex-grow text-left">{label}</span>
      {dots && (
        <div className="flex gap-1 ml-2">
          {Array.from({ length: dots }).map((_, i) => (
            <span 
              key={i} 
              className="h-2 w-2 rounded-full bg-green-500"
              style={{
                animation: 'dot-progress 1.5s infinite',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
      {redDot && (
        <span 
          className="h-2.5 w-2.5 rounded-full bg-red-500 ml-2"
          style={{
            animation: 'red-dot-pulse 1.5s infinite'
          }}
        />
      )}
      {greenDot && (
        <span 
          className="h-2.5 w-2.5 rounded-full bg-green-500 ml-2"
          style={{
            animation: 'green-dot-pulse 1.5s infinite'
          }}
        />
      )}
      {badge && (
        <span className={cn(
          "ml-auto rounded-full px-2 py-0.5 text-xs",
          typeof badge === "string" && badge.toLowerCase() === "new" 
            ? "bg-blue-100 text-blue-800" 
            : redDot
              ? "bg-red-100 text-red-800"
              : greenDot
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
        )}>
          {badge}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          active && "bg-sidebar-accent font-medium text-[#9C2D55]"
        )}
        onClick={onClick}
        asChild
      >
        <Link to={to}>
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent font-medium text-[#9C2D55]"
      )}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default SidebarItem;
