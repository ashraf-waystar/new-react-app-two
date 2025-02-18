import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ArrowUpRight } from "lucide-react";

// Google Sheets submission URL
const FORM_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTGMgJ0wvGAsq7BaikEKj6CWYt_vXx2Ccerg0q6zo8dH3KBwlb7N0AoZoU528vUSQF/exec";

type FormStep = 'requirements' | 'contact' | 'additional';

interface FormData {
  requirements: string;
  name: string;
  email: string;
  phone: string;
  additional: string;
}

export default function ChatbotForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('requirements');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    requirements: '',
    name: '',
    email: '',
    phone: '',
    additional: ''
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
      if (!formData.requirements.trim()) {
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
        body: formDataToSend
      });

      if (response.ok) {
        toast({
          title: "Thanks for your interest!",
          description: "We'll get back to you soon."
        });
        setFormData({
          requirements: '',
          name: '',
          email: '',
          phone: '',
          additional: ''
        });
        setCurrentStep('requirements');
      } else {
        throw new Error('Submission failed');
      }
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

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-4">
      {currentStep === 'requirements' && (
        <div>
          <Textarea
            name="requirements"
            value={formData.requirements}
            onChange={(e) => handleInputChange('requirements', e.target.value)}
            placeholder={placeholderText}
            className="w-full min-h-[80px] mb-3 resize-none border-none focus:ring-0"
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <Button 
                variant="ghost" 
                className="h-8 px-2"
                onClick={() => window.location.href='tel:+18333311118'}
              >
                <span className="w-4 h-4 mr-1">📞</span>
                +1 8 3333 1111 8
              </Button>
              <Button 
                variant="ghost"
                className="h-8 px-2"
                onClick={() => window.location.href='mailto:hello@stellardigitech.com'}
              >
                <span className="w-4 h-4 mr-1">✉️</span>
                hello@stellardigitech.com
              </Button>
            </div>
            <Button 
              onClick={handleNext}
              size="icon"
              className="rounded-full bg-black hover:bg-gray-800"
            >
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'contact' && (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="border-none focus:ring-0"
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="border-none focus:ring-0"
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="border-none focus:ring-0"
            />
          </div>
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('requirements')}
              className="h-8"
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              size="icon"
              className="rounded-full bg-black hover:bg-gray-800"
            >
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'additional' && (
        <div>
          <Textarea
            name="additional"
            placeholder="Any additional notes or requirements..."
            value={formData.additional}
            onChange={(e) => handleInputChange('additional', e.target.value)}
            className="w-full min-h-[80px] mb-4 resize-none border-none focus:ring-0"
          />
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('contact')}
              className="h-8"
            >
              Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              size="icon"
              className="rounded-full bg-black hover:bg-gray-800"
            >
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}