import { ChevronLeft, Headphones } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showBrandTitle?: boolean;
  showNavTabs?: boolean;
}

export const Header = ({ 
  title = "My Orders", 
  showBack = false,
  showBrandTitle = false,
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
      {/* Brand Title Bar - optional */}
      {showBrandTitle && (
        <div className="bg-primary text-primary-foreground py-2 px-4">
          <div className="container flex items-center justify-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wide">
                The Sleep Company
              </span>
            </Link>
          </div>
        </div>
      )}
      
      {/* Main Header */}
      <div className="container flex h-14 items-center justify-between md:h-16 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={handleBack}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          )}
          {!showBack && (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">SC</span>
              </div>
              <span className="hidden text-lg font-semibold text-foreground sm:inline">
                The Sleep Company
              </span>
            </Link>
          )}
        </div>

        {/* Center title or Navigation */}
        {showBack ? (
          <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-foreground md:text-lg">
            {title}
          </h1>
        ) : showNavTabs ? (
          <nav className="hidden sm:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-6 py-4 text-base font-medium transition-colors",
                  isActive(item.path)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"
                  />
                )}
              </Link>
            ))}
          </nav>
        ) : null}

        {/* Mobile Navigation - Full width tabs with underline */}
        {!showBack && showNavTabs && (
          <nav className="flex sm:hidden items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-underline-mobile"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"
                  />
                )}
              </Link>
            ))}
          </nav>
        )}

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
          aria-label="Contact support"
        >
          <Headphones className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </motion.header>
  );
};
