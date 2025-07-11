import { User } from "@/components/UserContext";

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId: string;
  rating: number;
  totalRatings: number;
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  createdAt: Date;
}

// Mock data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@example.com",
    address: "123 Admin Street, Admin City",
    role: "admin"
  },
  {
    id: "2",
    name: "Jane Customer",
    email: "jane@example.com",
    address: "456 Customer Ave, Customer Town",
    role: "user"
  },
  {
    id: "3",
    name: "Bob Store Owner",
    email: "bob@storeowner.com",
    address: "789 Business Blvd, Business District",
    role: "store_owner"
  }
];

export const mockStores: Store[] = [
  {
    id: "1",
    name: "Best Electronics Store",
    email: "contact@bestelectronics.com",
    address: "123 Tech Street, Silicon Valley",
    ownerId: "3",
    rating: 4.5,
    totalRatings: 15
  },
  {
    id: "2",
    name: "Fresh Grocery Market",
    email: "info@freshgrocery.com",
    address: "456 Food Lane, Green Valley",
    ownerId: "4",
    rating: 4.2,
    totalRatings: 28
  },
  {
    id: "3",
    name: "Fashion Boutique",
    email: "hello@fashionboutique.com",
    address: "789 Style Avenue, Fashion District",
    ownerId: "5",
    rating: 3.8,
    totalRatings: 12
  }
];

export const mockRatings: Rating[] = [
  {
    id: "1",
    userId: "2",
    storeId: "1",
    rating: 5,
    createdAt: new Date()
  },
  {
    id: "2",
    userId: "2",
    storeId: "2",
    rating: 4,
    createdAt: new Date()
  }
];