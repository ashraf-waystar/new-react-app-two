import { services, type Service, type InsertService } from "@shared/schema";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
}

export class MemStorage implements IStorage {
  private services: Map<number, Service>;
  private currentId: number;

  constructor() {
    this.services = new Map();
    this.currentId = 1;
    this.initializeServices();
  }

  private initializeServices() {
    const initialServices: InsertService[] = [
      {
        name: "Web Development",
        description: "Custom website development using modern technologies",
        price: "2999.99",
        image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd",
        category: "development"
      },
      {
        name: "Digital Marketing",
        description: "Comprehensive digital marketing strategies",
        price: "1499.99",
        image: "https://images.unsplash.com/photo-1649105703438-0992d6844823",
        category: "marketing"
      },
      {
        name: "SEO Optimization",
        description: "Search engine optimization to improve visibility",
        price: "999.99",
        image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
        category: "marketing"
      },
      {
        name: "UI/UX Design",
        description: "User-centered design solutions",
        price: "1999.99",
        image: "https://images.unsplash.com/photo-1605152276897-4f618f831968",
        category: "design"
      },
      {
        name: "Content Strategy",
        description: "Strategic content planning and creation",
        price: "799.99",
        image: "https://images.unsplash.com/photo-1529169436040-836f3d93f0f8",
        category: "marketing"
      },
      {
        name: "Brand Development",
        description: "Comprehensive brand identity development",
        price: "2499.99",
        image: "https://images.unsplash.com/photo-1521699492617-3ed82a0501d6",
        category: "branding"
      }
    ];

    initialServices.forEach(service => this.createService(service));
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentId++;
    const newService = { id, ...service };
    this.services.set(id, newService);
    return newService;
  }
}

export const storage = new MemStorage();
