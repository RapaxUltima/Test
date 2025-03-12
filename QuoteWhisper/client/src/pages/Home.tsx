import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { QuoteCard } from "@/components/QuoteCard";
import { GenerateButton } from "@/components/GenerateButton";
import { Footer } from "@/components/Footer";
import { Quote } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [randomizeKey, setRandomizeKey] = useState<number>(0);
  const { toast } = useToast();
  
  // Custom query function to log the fetch process
  const fetchQuote = async ({ queryKey }: { queryKey: (string | number)[] }) => {
    console.log('Fetching quote with key:', queryKey);
    const response = await fetch(queryKey[0] as string);
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Quote data received:', data);
    return data;
  };
  
  const { data: quote, isLoading, isError, error, refetch } = useQuery<Quote>({
    queryKey: ['/api/quotes/random', randomizeKey],
    queryFn: fetchQuote,
    retry: 1,
  });

  // Show error toast when API request fails
  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error fetching quote",
        description: error instanceof Error ? error.message : "Failed to load quote",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  const handleGenerateNewQuote = async () => {
    // Trigger a refetch by updating the randomize key
    setRandomizeKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[#F6EED8] text-[#333333]">
      <main className="max-w-2xl w-full mx-auto bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-lg">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#333333] font-playfair">
            Daily Wisdom
          </h1>
          <p className="text-[#777777] font-lato mt-2">
            Discover inspiring quotes for your journey
          </p>
        </header>
        
        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#E5F7F7] rounded-2xl p-4 text-center shadow-sm">
            <span className="text-xl font-bold text-[#1DA1A3]">{randomizeKey}</span>
            <p className="text-sm text-[#555555]">Quotes viewed</p>
          </div>
          <div className="bg-[#FFE9E9] rounded-2xl p-4 text-center shadow-sm">
            <span className="text-xl font-bold text-[#FF6B6B]">∞</span>
            <p className="text-sm text-[#555555]">Daily limit</p>
          </div>
          <div className="bg-[#FFF2D9] rounded-2xl p-4 text-center shadow-sm">
            <span className="text-xl font-bold text-[#FFB23F]">✓</span>
            <p className="text-sm text-[#555555]">Premium access</p>
          </div>
        </div>
        
        {/* Quote Card */}
        <QuoteCard quote={quote} isLoading={isLoading} />
        
        {/* Generate Button */}
        <GenerateButton onClick={handleGenerateNewQuote} isLoading={isLoading} />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
