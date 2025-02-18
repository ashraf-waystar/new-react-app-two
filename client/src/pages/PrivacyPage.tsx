export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose">
          <h1>Privacy Policy</h1>

          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name and contact information</li>
            <li>Business information</li>
            <li>Communication preferences</li>
            <li>Project requirements and specifications</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Communicate with you about your projects</li>
            <li>Send you updates and marketing communications</li>
            <li>Improve our services and develop new features</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our business.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us:
          </p>
          <ul>
            <li>Email: hello@stellardigitech.com</li>
            <li>Phone: +1 8 3333 1111 8</li>
            <li>Address: 314 JSR IND 831-001</li>
          </ul>
        </div>
      </div>
    </div>
  );
}