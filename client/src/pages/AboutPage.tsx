import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">About Our Agency</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're a team of passionate digital experts committed to delivering exceptional results for our clients through innovative solutions and strategic thinking.
            </p>
          </div>
        </div>
      </section>

      {/* Office Images */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e"
              alt="Office Space"
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4"
              alt="Workspace"
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To empower businesses with cutting-edge digital solutions that drive growth, enhance visibility, and create meaningful connections with their audience.
              </p>
              <p className="text-gray-600">
                We believe in combining creativity with technical excellence to deliver results that exceed expectations.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="font-bold mr-2">Innovation:</span>
                  <span className="text-gray-600">Constantly pushing boundaries and embracing new technologies</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Excellence:</span>
                  <span className="text-gray-600">Delivering the highest quality in everything we do</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Collaboration:</span>
                  <span className="text-gray-600">Working closely with clients to achieve shared goals</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Integrity:</span>
                  <span className="text-gray-600">Maintaining honesty and transparency in all interactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Contact us to discuss your project.
          </p>
          <Link href="/contact">
            <Button size="lg">Get in Touch</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
