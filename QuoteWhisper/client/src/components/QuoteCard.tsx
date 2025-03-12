import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface QuoteCardProps {
  quote: Quote | null | undefined;
  isLoading: boolean;
}

export function QuoteCard({ quote, isLoading }: QuoteCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#1DA1A3] to-[#0A8A8C] rounded-2xl shadow-lg p-6 sm:p-10 mb-8 relative overflow-hidden transition-all duration-300 ease-in-out min-h-[240px] sm:min-h-[280px] flex flex-col justify-center">
      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-16 h-16 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-white opacity-10 rounded-full"></div>
      <div className="absolute top-1/2 left-3 w-4 h-4 bg-white opacity-10 rounded-full"></div>
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center my-8"
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_0.3s]"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_0.6s]"></div>
            </div>
          </motion.div>
        ) : quote ? (
          <motion.div 
            key={quote.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center z-10"
          >
            <p className="text-xl sm:text-2xl font-playfair italic mb-6 text-white">
              {quote.text}
            </p>
            <div className="flex justify-end items-center mt-4">
              <div className="w-8 h-1 bg-white opacity-50 mr-3"></div>
              <p className="text-white opacity-90 font-lato">
                {quote.author}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <Skeleton className="h-6 w-full bg-white/20" />
            <Skeleton className="h-6 w-full bg-white/20" />
            <Skeleton className="h-6 w-3/4 mx-auto bg-white/20" />
            <Skeleton className="h-4 w-1/3 ml-auto mt-4 bg-white/20" />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
