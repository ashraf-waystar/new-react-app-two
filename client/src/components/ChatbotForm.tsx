import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Step = {
  id: string;
  message: string;
  input: "text" | "textarea" | "none";
  placeholder?: string;
};

const steps: Step[] = [
  {
    id: "welcome",
    message: "👋 Hi! I'm here to help you with your project. Shall we get started?",
    input: "none"
  },
  {
    id: "requirements",
    message: "What kind of project do you have in mind? Please describe your requirements.",
    input: "textarea",
    placeholder: "E.g., I need a website for my business with an online store..."
  },
  {
    id: "name",
    message: "Great! Could you tell me your name?",
    input: "text",
    placeholder: "Your name"
  },
  {
    id: "phone",
    message: "What's the best phone number to reach you?",
    input: "text",
    placeholder: "Your phone number"
  },
  {
    id: "details",
    message: "Any additional details you'd like to share?",
    input: "textarea",
    placeholder: "Additional project details, timeline, budget, etc."
  }
];

export default function ChatbotForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const handleNext = () => {
    if (steps[currentStep].input !== "none" && !inputValue.trim()) {
      toast({
        title: "Please fill in the field",
        description: "This information helps us better understand your needs",
        variant: "destructive"
      });
      return;
    }

    if (steps[currentStep].input !== "none") {
      setResponses(prev => ({
        ...prev,
        [steps[currentStep].id]: inputValue
      }));
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setInputValue("");
    } else {
      // Handle form submission
      toast({
        title: "Thanks for your interest!",
        description: "We'll get back to you soon."
      });
      setCurrentStep(0);
      setResponses({});
      setInputValue("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="space-y-4">
        {steps.slice(0, currentStep + 1).map((step, index) => (
          <div
            key={step.id}
            className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                index % 2 === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent"
              }`}
            >
              <p>{step.message}</p>
              {index === currentStep && step.input !== "none" && (
                <div className="mt-4">
                  {step.input === "textarea" ? (
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={step.placeholder}
                      className="bg-white"
                      rows={4}
                    />
                  ) : (
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={step.placeholder}
                      className="bg-white"
                    />
                  )}
                  <Button
                    className="mt-2 w-full"
                    onClick={handleNext}
                  >
                    {currentStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
              )}
              {index === currentStep && step.input === "none" && (
                <Button
                  className="mt-2"
                  onClick={handleNext}
                >
                  Get Started
                </Button>
              )}
              {index < currentStep && responses[step.id] && (
                <p className="mt-2 text-sm opacity-80">
                  {responses[step.id]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
