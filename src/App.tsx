import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhoneAuth from "./pages/PhoneAuth";
import OrderListing from "./pages/OrderListing";
import ItemTracking from "./pages/ItemTracking";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhoneAuth />} />
          <Route path="/orders" element={<OrderListing />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/track/:orderId" element={<ItemTracking />} />
          <Route path="/track/:orderId/:shipmentId" element={<ItemTracking />} />
          {/* Legacy routes redirect */}
          <Route path="/pages/orderlisting" element={<Navigate to="/orders" replace />} />
          <Route path="/pages/itemtracking/:orderId" element={<Navigate to="/orders" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
