import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function MainPage() {
  const { data: services } = useQuery<Service[]>({ 
    queryKey: ["/api/services"]
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Transform Your Digital Presence
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're a full-service digital agency helping businesses thrive in the digital age through innovative web solutions and strategic marketing.
            </p>
            <div className="space-x-4">
              <Link href="/services">
                <Button size="lg">View Our Services</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          {services ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Loading services...</div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" alt="Team Member" className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="font-bold">John Smith</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            <div className="text-center">
              <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f" alt="Team Member" className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="font-bold">Sarah Johnson</h3>
              <p className="text-gray-600">Marketing Director</p>
            </div>
            <div className="text-center">
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" alt="Team Member" className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="font-bold">Mike Wilson</h3>
              <p className="text-gray-600">UI/UX Designer</p>
            </div>
            <div className="text-center">
              <img src="https://images.unsplash.com/photo-1455849318743-b2233052fcff" alt="Team Member" className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="font-bold">Emily Davis</h3>
              <p className="text-gray-600">Content Strategist</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your business grow through digital excellence.
          </p>
          <Link href="/contact">
            <Button size="lg">Contact Us Today</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
