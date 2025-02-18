export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose">
          <h1>Terms and Conditions</h1>
          
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing our services, you agree to be bound by these terms and conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
          
          <h2>2. Services</h2>
          <p>
            We provide various digital marketing and web development services. The specific deliverables, timelines, and terms will be outlined in individual service agreements or statements of work.
          </p>
          
          <h2>3. Payment Terms</h2>
          <p>
            Payment terms will be specified in individual service agreements. Generally, we require a deposit before beginning work, with the balance due upon completion or according to agreed-upon milestones.
          </p>
          
          <h2>4. Intellectual Property</h2>
          <p>
            Upon full payment, clients receive all rights to the final deliverables. We retain rights to preliminary concepts and the right to use the work in our portfolio.
          </p>
          
          <h2>5. Confidentiality</h2>
          <p>
            We maintain strict confidentiality regarding all client information and project details shared during our engagement.
          </p>
          
          <h2>6. Project Changes</h2>
          <p>
            Any changes to the agreed-upon scope of work must be approved in writing and may result in additional charges and timeline adjustments.
          </p>
          
          <h2>7. Limitation of Liability</h2>
          <p>
            Our liability is limited to the amount paid for services. We are not liable for any consequential damages or lost profits.
          </p>
          
          <h2>8. Termination</h2>
          <p>
            Either party may terminate services with written notice. Client is responsible for payment for work completed up to the termination date.
          </p>
          
          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by the laws of [Jurisdiction]. Any disputes will be resolved in the courts of this jurisdiction.
          </p>
          
          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.
          </p>
        </div>
      </div>
    </div>
  );
}
