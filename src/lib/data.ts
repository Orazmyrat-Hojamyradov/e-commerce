export const products = [
  {
    id: 1,
    name: "Next.js Dashboard",
    priceInCents: 20000,
    filePath: "/products/next.svg",
    imagePath: "/products/next.svg",
    description: "Feature-rich dashboard built with Next.js",
    isAvailableForPurchase: true,
    createdAt: "01.09.2024",
  },
  {
    id: 2,
    name: "React Admin Panel",
    priceInCents: 25000,
    filePath: "/products/react.svg",
    imagePath: "/products/react.svg",
    description: "Admin panel built with React and Material UI",
    isAvailableForPurchase: true,
    createdAt: "05.09.2024",
  },
  {
    id: 3,
    name: "Node.js API",
    priceInCents: 18000,
    filePath: "/products/nodejs-logo-svgrepo-com.svg",
    imagePath: "/products/nodejs-logo-svgrepo-com.svg",
    description: "RESTful API using Node.js and Express",
    isAvailableForPurchase: true,
    createdAt: "10.09.2024",
  },
  {
    id: 4,
    name: "GraphQL Server",
    priceInCents: 22000,
    filePath: "/products/graphql-svgrepo-com.svg",
    imagePath: "/products/graphql-svgrepo-com.svg",
    description: "GraphQL server with Apollo and Node.js",
    isAvailableForPurchase: true,
    createdAt: "12.09.2024",
  },
  {
    id: 5,
    name: "Vue.js E-commerce",
    priceInCents: 30000,
    filePath: "/products/vue-svgrepo-com.svg",
    imagePath: "/products/vue-svgrepo-com.svg",
    description: "Complete e-commerce platform built with Vue.js",
    isAvailableForPurchase: false,
    createdAt: "15.09.2024",
  },
  {
    id: 6,
    name: "SvelteKit Portfolio",
    priceInCents: 17000,
    filePath: "/products/svelte-svgrepo-com.svg",
    imagePath: "/products/svelte-svgrepo-com.svg",
    description: "Personal portfolio template using SvelteKit",
    isAvailableForPurchase: true,
    createdAt: "18.09.2024",
  },
  {
    id: 7,
    name: "Angular Admin Template",
    priceInCents: 28000,
    filePath: "/products/angular-icon-svgrepo-com.svg",
    imagePath: "/products/angular-icon-svgrepo-com.svg",
    description: "Admin template built with Angular and TailwindCSS",
    isAvailableForPurchase: true,
    createdAt: "20.09.2024",
  },
  {
    id: 8,
    name: "Python Django Blog",
    priceInCents: 23000,
    filePath: "/products/python-svgrepo-com.svg",
    imagePath: "/products/python-svgrepo-com.svg",
    description: "Blog platform developed with Django and Python",
    isAvailableForPurchase: true,
    createdAt: "25.09.2024",
  },
];

export type Product = {
  id: number;
  name: string;
  priceInCents: number;
  filePath: string;
  imagePath: string;
  description: string;
  isAvailableForPurchase: boolean;
  createdAt: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
};

export const users: User[] = [
  {
    id: 1,
    firstname: "Oraz",
    lastname: "Hojamyradov",
    password: "02112005",
    email: "yakupyakupbow197@gmail.com",
  },
  {
    id: 2,
    firstname: "John",
    lastname: "Doe",
    password: "password123",
    email: "john.doe@example.com",
  },
  {
    id: 3,
    firstname: "Jane",
    lastname: "Smith",
    password: "securePass456",
    email: "jane.smith@example.com",
  },
  {
    id: 4,
    firstname: "Alice",
    lastname: "Johnson",
    password: "alice2024",
    email: "alice.johnson@example.com",
  },
  {
    id: 5,
    firstname: "Bob",
    lastname: "Williams",
    password: "bobSafePass789",
    email: "bob.williams@example.com",
  },
];
