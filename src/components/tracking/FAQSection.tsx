import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your order using this page. The tracking timeline shows real-time updates from our courier partners. You can also tap on the courier name to see detailed journey information.",
  },
  {
    question: "What is the 100 Nights Trial?",
    answer:
      "Our 100 Nights Trial lets you test our mattresses risk-free for 100 nights. If you're not completely satisfied, we'll arrange a free pickup and provide a full refund. This ensures you get the perfect sleep experience.",
  },
  {
    question: "How do I return or replace my product?",
    answer:
      "For returns, simply tap on 'Returns & Replacements' in the Order Information section above. We offer free returns within 7 days for most products. Mattresses come with our 100 Nights Trial policy for worry-free returns.",
  },
  {
    question: "When will my order be delivered?",
    answer:
      "Delivery times vary based on your location and product availability. Standard delivery takes 5-7 business days. The expected delivery date shown on this page is an estimate and may change based on courier partner updates.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us through multiple channels: Use the 'Contact Support' button at the bottom of this page, call us at 1800-123-4567 (toll-free), or email support@thesleepcompany.in. Our team is available Mon-Sat, 9 AM - 9 PM.",
  },
];

export const FAQSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="rounded-xl border border-border/50 bg-card px-4 shadow-card"
          >
            <AccordionTrigger className="py-4 hover:no-underline text-left">
              <span className="font-medium text-sm pr-2">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
};
