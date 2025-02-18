import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTypewriter } from "@/hooks/useTypewriter";

export default function ChatbotForm() {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();
  const placeholderText = useTypewriter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      toast({
        title: "Please fill in your requirements",
        description: "This helps us understand your needs better",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Thanks for your interest!",
      description: "We'll get back to you soon."
    });
    setInputValue("");
  };

  return (
    <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
      <Textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholderText}
        className="w-full min-h-[100px] mb-4 resize-none"
      />
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => window.location.href='tel:+18333311118'}
        >
          <span className="w-4 h-4">📞</span>
          +1 8 3333 1111 8
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => window.location.href='mailto:hello@stellardigitech.com'}
        >
          <span className="w-4 h-4">✉️</span>
          hello@stellardigitech.com
        </Button>
        <Button 
          className="ml-auto"
          onClick={handleSubmit}
        >
          Inquire More
        </Button>
      </div>
    </div>
  );
}