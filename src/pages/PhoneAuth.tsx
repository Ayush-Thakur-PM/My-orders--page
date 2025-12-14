import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";

const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setIsLoading(true);
      // Simulate auth - in real app this would verify OTP
      setTimeout(() => {
        navigate("/orders");
      }, 800);
    }
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    return digits;
  };

  return (
    <div className="min-h-screen bg-background hex-pattern">
      <Header title="" showNavTabs={false} />
      
      <main className="container flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo and title */}
          <div className="mb-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg"
            >
              <span className="text-2xl font-bold text-primary-foreground">SC</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Track Your Order
            </h1>
            <p className="mt-2 text-muted-foreground">
              Enter your phone number to view your orders
            </p>
          </div>

          {/* Phone input form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-2 border-r border-border pr-3">
                <span className="text-lg">🇮🇳</span>
                <span className="text-sm font-medium text-muted-foreground">+91</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="Enter mobile number"
                className="h-14 w-full rounded-xl border border-border bg-card pl-24 pr-4 text-lg font-medium text-foreground shadow-card transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
              {phone.length >= 10 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success">
                    <svg className="h-3.5 w-3.5 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={phone.length < 10 || isLoading}
              whileTap={{ scale: 0.98 }}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              ) : (
                <>
                  Login
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Shield className="h-4 w-4" />
            <span>Your data is secure & encrypted</span>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default PhoneAuth;
