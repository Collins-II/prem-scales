export interface NavigationCategory {
  id: string;
  name: string;
  icon: string;
}

export const NAVIGATION_DATA: NavigationCategory[] = [
  {
    id: "retail",
    name: "Retail Scales",
    icon: "/products/lab-s2.png",
  },

  {
    id: "laboratory",
    name: "Laboratory Scales",
    icon: "/products/lab-s1.png",
  },

  {
    id: "industrial",
    name: "Industrial Scales",
    icon: "/products/retail-s2.png",
  },

  {
    id: "weighbridges",
    name: "Weighbridges",
    icon: "/products/retail-s3.png",
  },

  {
    id: "services",
    name: "Services & Support",
    icon: "/products/retail-s4.png",
  },
];
