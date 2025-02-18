import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Agency</h3>
            <p className="text-gray-600">
              Transforming businesses through digital excellence
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>314 JSR IND 831-001</li>
              <li>hello@stellardigitech.com</li>
              <li>+1 8 3333 1111 8</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col items-center gap-4">
            <img 
              src="/attached_assets/png-transparent-mastercard-visa-credit-card-paypal-logo-mastercard-text-display-advertising-payment.png"
              alt="Payment Methods Accepted"
              className="h-8 object-contain"
            />
            <p className="text-center text-gray-600">
              &copy; {new Date().getFullYear()} Agency. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}