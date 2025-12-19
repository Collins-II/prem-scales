export const scaleProduct = [
  {
    title: "New Release Products",
    categoryLabel: "Retail",
    bannerImage: "/users/1.png",
    viewAllHref: "/Products/retail",
    products: [
      {
        id: 1,
        name: "Digital Price Computing Scale",
        description:
          "Accurate retail scale with price computation, ideal for supermarkets and shops.",
        image: "/products/retail-s1.png",
        category: "Retail",
        href: "/products/retail/digital-price-scale",
      },
      {
        id: 2,
        name: "Countertop Weighing Scale",
        description:
          "Compact and durable scale for daily retail weighing operations.",
        image: "/products/retail-s2.png",
        category: "Retail",
        href: "/products/retail/countertop-scale",
      },
    ],
  },

  {
    title: "Precision Instruments",
    categoryLabel: "Laboratory",
    bannerImage: "/users/23.png",
    viewAllHref: "/products/laboratory",
    products: [
      {
        id: 3,
        name: "Analytical Balance",
        description:
          "High-precision laboratory balance for research and quality control.",
        image: "/products/retail-s3.png",
        category: "Laboratory",
        href: "/products/laboratory/analytical-balance",
      },
      {
        id: 4,
        name: "Precision Digital Balance",
        description:
          "Reliable precision weighing for educational and industrial labs.",
        image: "/products/lab-s1.png",
        category: "Laboratory",
        href: "/products/laboratory/precision-balance",
      },
    ],
  },

  {
    title: "Heavy Duty Solutions",
    categoryLabel: "Industrial",
    bannerImage: "/users/25.png",
    viewAllHref: "/products/industrial",
    products: [
      {
        id: 5,
        name: "Industrial Platform Scale",
        description:
          "Heavy-duty platform scale designed for warehouses and factories.",
        image: "/products/retail-s5.png",
        category: "Industrial",
        href: "/products/industrial/platform-scale",
      },
      {
        id: 6,
        name: "Electronic Floor Scale",
        description:
          "Robust floor scale for accurate weighing of pallets and bulk goods.",
        image: "/products/commer-s2.png",
        category: "Industrial",
        href: "/products/industrial/floor-scale",
      },
    ],
  },
];


export const BANNERS = [
  "/products/retail-s4.png",
  "/products/retail-s3.png",
  "/products/retail-s1.png",
  "/products/lab-s1.png",
]

export const NEW_RELEASE = [
  "/products/retail-s2.png",
  "/products/retail-s5.png",
  "/products/retail-s1.png",
  "/products/lab-s1.png",
]

export type Product = {
  id: number;
  slug: string; // SEO-friendly URL
  name: string;
  category: "Retail" | "Laboratory" | "Industrial";
  description: string;
  image: string; // main hero image
  gallery?: string[]; // additional gallery images
  price: number; // in ZMW or USD
  features?: string[]; // key selling points
  specifications?: Record<string, string>; // e.g., {"Capacity": "30kg", "Precision": "0.01g"}
  dimensions?: string; // e.g., "Width x Depth x Height"
  tags?: string[]; // for filtering/search
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "digital-retail-scale",
    name: "Digital Retail Scale",
    category: "Retail",
    description: "Accurate and durable weighing scale for shops and supermarkets.",
    image: "/products/retail-s1.png",
    gallery: [
      "/products/retail-s1.png",
      "/products/retail-s2.png",
      "/products/retail-s3.png",
    ],
    price: 4500,
    features: ["High precision", "Compact design", "Easy to calibrate"],
    specifications: {
      Capacity: "30kg",
      Precision: "5g",
      Display: "LCD backlight",
    },
    dimensions: "30cm x 30cm x 10cm",
    tags: ["retail", "compact", "digital"],
  },
  {
    id: 2,
    slug: "price-computing-scale",
    name: "Price Computing Scale",
    category: "Retail",
    description: "Integrated price computation for retail environments.",
    image: "/products/retail-s3.png",
    gallery: [
      "/products/retail-s3.png",
      "/products/retail-s4.png",
      "/products/retail-s5.png",
    ],
    price: 7200,
    features: ["Auto price calculation", "Tare function", "Battery & AC powered"],
    specifications: {
      Capacity: "15kg",
      Precision: "1g",
      Display: "LCD with price computation",
    },
    dimensions: "35cm x 35cm x 12cm",
    tags: ["retail", "price-computing", "digital"],
  },
  {
    id: 3,
    slug: "precision-laboratory-scale",
    name: "Precision Laboratory Scale",
    category: "Laboratory",
    description: "High-precision scale for laboratory and research use.",
    image: "/products/lab-s1.png",
    gallery: [
      "/products/lab-s1.png",
      "/products/lab-s2.png",
      "/products/commer-s1.png",
    ],
    price: 15000,
    features: ["Microgram precision", "Stable readings", "Calibration support"],
    specifications: {
      Capacity: "500g",
      Precision: "0.001g",
      Display: "Digital LCD",
    },
    dimensions: "25cm x 25cm x 10cm",
    tags: ["lab", "precision", "research"],
  },
  {
    id: 4,
    slug: "analytical-balance",
    name: "Analytical Balance",
    category: "Laboratory",
    description: "Ultra-fine measurements for scientific accuracy.",
    image: "/products/lab-s2.png",
    gallery: [
      "/products/lab-s2.png",
      "/products/retail-s2.png",
      "/products/retail-s3.png",
    ],
    price: 22000,
    features: ["High sensitivity", "Draft shield", "Calibration certificate included"],
    specifications: {
      Capacity: "200g",
      Precision: "0.0001g",
      Display: "Digital",
    },
    dimensions: "28cm x 28cm x 12cm",
    tags: ["lab", "analytical", "precision"],
  },
  {
    id: 5,
    slug: "industrial-platform-scale",
    name: "Industrial Platform Scale",
    category: "Industrial",
    description: "Heavy-duty platform scale for warehouses and factories.",
    image: "/products/retail-s5.png",
    gallery: [
      "/products/retail-s5.png",
      "/products/retail-s3.png",
      "/products/retail-s5.png",
    ],
    price: 32000,
    features: ["High capacity", "Robust construction", "Digital display"],
    specifications: {
      Capacity: "1000kg",
      Precision: "500g",
      Display: "LED digital",
    },
    dimensions: "100cm x 100cm x 15cm",
    tags: ["industrial", "platform", "heavy-duty"],
  },
  {
    id: 6,
    slug: "truck-weighbridge-system",
    name: "Truck Weighbridge System",
    category: "Industrial",
    description: "Reliable vehicle weighing solution for logistics.",
    image: "/products/retail-s4.png",
    gallery: [
      "/products/retail-s4.png",
      "/products/lab-s2.png",
      "/products/commer-s1.png",
    ],
    price: 180000,
    features: ["High accuracy", "Durable steel construction", "Remote monitoring option"],
    specifications: {
      Capacity: "50,000kg",
      Precision: "10kg",
      Display: "Digital/Remote",
    },
    dimensions: "20m x 3m x 0.5m",
    tags: ["industrial", "truck", "weighbridge"],
  },
];
