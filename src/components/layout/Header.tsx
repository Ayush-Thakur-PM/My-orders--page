import { ChevronLeft, Headphones } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNavTabs?: boolean;
}

export const Header = ({ 
  title = "My Orders", 
  showBack = false,
  showNavTabs = true 
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/orders");
    }
  };

  const navItems = [
    { label: "Orders", path: "/orders" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "My Profile", path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-background border-b border-border/30"
    >
      {/* Brand Bar - Always visible */}
      <div className="border-b border-border/20">
        <div className="container flex h-14 items-center justify-between md:h-16 max-w-2xl mx-auto px-4">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/images/tsc-logo.webp" 
              alt="The Sleep Company Logo"
              className="h-8 w-auto object-contain"
            />
          </Link>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
            aria-label="Contact support"
          >
            <Headphones className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs Row OR Back Button Row */}
      {showBack ? (
        <div className="container flex h-12 items-center max-w-2xl mx-auto px-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-foreground"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">{title}</span>
          </button>
        </div>
      ) : showNavTabs ? (
        <nav className="container flex items-center justify-center max-w-2xl mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex-1 text-center py-3 text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {isActive(item.path) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-[3px] bg-primary rounded-t-full"
                />
              )}
            </Link>
          ))}
        </nav>
      ) : null}
    </motion.header>
  );
};
