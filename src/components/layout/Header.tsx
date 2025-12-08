import { ChevronLeft, Headphones } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export const Header = ({ title = "My Orders", showBack = false }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/orders");
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass border-b border-border/50"
    >
      <div className="container flex h-14 items-center justify-between md:h-16">
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
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">SC</span>
              </div>
              <span className="hidden text-lg font-semibold text-foreground sm:inline">
                The Sleep Company
              </span>
            </Link>
          </div>
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-foreground md:text-lg">
          {title}
        </h1>

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
