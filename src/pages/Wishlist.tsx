import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { StickyBottomCTA } from "@/components/ui/sticky-bottom-cta";
import { Heart } from "lucide-react";

const Wishlist = () => {
  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Wishlist" />

      <main className="container px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Your wishlist is empty</h3>
          <p className="mt-1 text-muted-foreground max-w-xs">
            Save items you love by tapping the heart icon on any product
          </p>
        </motion.div>
      </main>

      <StickyBottomCTA
        primaryLabel="Need Help?"
        secondaryLabel="Call Support"
      />
    </div>
  );
};

export default Wishlist;
