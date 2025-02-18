import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  const { data: services } = useQuery<Service[]>({ 
    queryKey: ["/api/services"]
  });

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-600">
            We offer a comprehensive range of digital services to help your business succeed in the digital landscape.
          </p>
        </div>

        {services ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading services...</div>
        )}

        {/* Process Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-bold mb-2">Discovery</h3>
              <p className="text-gray-600">Understanding your needs and objectives</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-bold mb-2">Strategy</h3>
              <p className="text-gray-600">Developing a tailored action plan</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-bold mb-2">Implementation</h3>
              <p className="text-gray-600">Executing the strategy with precision</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-bold mb-2">Results</h3>
              <p className="text-gray-600">Measuring and optimizing performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
