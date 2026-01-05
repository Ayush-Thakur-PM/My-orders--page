import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { StickyBottomCTA } from "@/components/ui/sticky-bottom-cta";
import { User, Settings, Bell, CreditCard, MapPin, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Profile = () => {
  const menuItems = [
    { icon: User, label: "Personal Information", description: "Name, email, phone" },
    { icon: MapPin, label: "Saved Addresses", description: "Manage delivery addresses" },
    { icon: CreditCard, label: "Payment Methods", description: "Cards and UPI" },
    { icon: Bell, label: "Notifications", description: "Email and push preferences" },
    { icon: Settings, label: "Account Settings", description: "Privacy and security" },
    { icon: HelpCircle, label: "Help & Support", description: "FAQs and contact" },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Profile" />

      <main className="container px-4 py-6 lg:py-8 max-w-2xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
            RS
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Rahul Sharma</h2>
            <p className="text-sm text-muted-foreground">+91 98278 74262</p>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex w-full items-center gap-4 rounded-xl p-4",
                "bg-card border border-border/50",
                "hover:bg-secondary/50 transition-colors"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </motion.button>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={cn(
            "mt-6 flex w-full items-center justify-center gap-2 rounded-xl p-4",
            "border border-destructive/30 text-destructive",
            "hover:bg-destructive/5 transition-colors"
          )}
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Log Out</span>
        </motion.button>
      </main>

      <StickyBottomCTA
        primaryLabel="Need Help?"
        secondaryLabel="Call Support"
      />
    </div>
  );
};

export default Profile;
