import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function GenerateButton({ onClick, isLoading }: GenerateButtonProps) {
  return (
    <div className="text-center">
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="bg-[#FF9F5A] hover:bg-[#FF8C40] text-white font-lato font-bold py-3 px-8 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF9F5A] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
      >
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Generate New Quote
        </span>
      </Button>
    </div>
  );
}
