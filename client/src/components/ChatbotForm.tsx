import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ArrowUpRight, Loader2 } from "lucide-react";

// Google Sheets submission URL
const FORM_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTGMgJ0wvGAsq7BaikEKj6CWYt_vXx2Ccerg0q6zo8dH3KBwlb7N0AoZoU528vUSQF/exec";

type FormStep = 'requirements' | 'contact' | 'additional' | 'success';

interface FormData {
  idea: string;
  name: string;
  email: string;
  phone: string;
  additional_info: string;
}

export default function ChatbotForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('requirements');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    idea: '',
    name: '',
    email: '',
    phone: '',
    additional_info: ''
  });

  const { toast } = useToast();
  const placeholderText = useTypewriter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length >= 10;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep === 'requirements') {
      if (!formData.idea.trim()) {
        toast({
          title: "Please describe your requirements",
          description: "This helps us understand your needs better",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep('contact');
    } else if (currentStep === 'contact') {
      if (!formData.name.trim()) {
        toast({
          title: "Please enter your name",
          description: "We need your name to better assist you",
          variant: "destructive"
        });
        return;
      }
      if (!validateEmail(formData.email)) {
        toast({
          title: "Invalid email",
          description: "Please provide a valid email address",
          variant: "destructive"
        });
        return;
      }
      if (!validatePhone(formData.phone)) {
        toast({
          title: "Invalid phone number",
          description: "Please provide a valid phone number with at least 10 digits",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep('additional');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch(FORM_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend
      });

      setCurrentStep('success');
      setTimeout(() => {
        setFormData({
          idea: '',
          name: '',
          email: '',
          phone: '',
          additional_info: ''
        });
        setCurrentStep('requirements');
      }, 3000);
    } catch (error) {
      toast({
        title: "Error submitting form",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentStep === 'success') {
    return (
      <div className="mt-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Thanks for reaching out!</h3>
          <p className="text-gray-600 text-center mt-2">
            We'll get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-4 sm:p-6">
      {currentStep === 'requirements' && (
        <div>
          <Textarea
            name="idea"
            value={formData.idea}
            onChange={(e) => handleInputChange('idea', e.target.value)}
            placeholder={placeholderText}
            className="w-full min-h-[80px] mb-4 resize-none rounded-xl border-none focus:ring-2 focus:ring-blue-200 bg-white/80"
          />
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 text-sm">
              <Button 
                variant="ghost" 
                className="h-10 sm:h-9 px-3 rounded-xl hover:bg-blue-50 justify-start sm:justify-center"
                onClick={() => window.location.href='tel:+18333311118'}
              >
                <span className="w-4 h-4 mr-2">📞</span>
                +1 8 3333 1111 8
              </Button>
              <Button 
                variant="ghost"
                className="h-10 sm:h-9 px-3 rounded-xl hover:bg-blue-50 justify-start sm:justify-center"
                onClick={() => window.location.href='mailto:hello@stellardigitech.com'}
              >
                <span className="w-4 h-4 mr-2">✉️</span>
                hello@stellardigitech.com
              </Button>
            </div>
            <Button 
              onClick={handleNext}
              size="icon"
              className="h-10 w-full sm:w-10 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'contact' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="rounded-xl border-none focus:ring-2 focus:ring-blue-200 bg-white/80"
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="rounded-xl border-none focus:ring-2 focus:ring-blue-200 bg-white/80"
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="rounded-xl border-none focus:ring-2 focus:ring-blue-200 bg-white/80"
            />
          </div>
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('requirements')}
              className="h-10 sm:h-9 rounded-xl hover:bg-blue-50"
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              size="icon"
              className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'additional' && (
        <div>
          <Textarea
            name="additional_info"
            placeholder="Any additional notes or requirements..."
            value={formData.additional_info}
            onChange={(e) => handleInputChange('additional_info', e.target.value)}
            className="w-full min-h-[80px] mb-4 resize-none rounded-xl border-none focus:ring-2 focus:ring-blue-200 bg-white/80"
          />
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('contact')}
              className="h-10 sm:h-9 rounded-xl hover:bg-blue-50"
            >
              Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              size="icon"
              className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}