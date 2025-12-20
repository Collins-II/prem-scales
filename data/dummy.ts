import { LucideIcon, Wrench, Scale, ShieldCheck, Settings } from "lucide-react";

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

export interface Service {
  id: number;
  slug: string;           // ✅ URL identifier
  title: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];

  // Optional (future-proofing)
  seoTitle?: string;
  seoDescription?: string;
}

export const SERVICES: Service[] = [
  {
    id: 1,
    slug: "calibration",
    title: "Calibration Services",
    description:
      "Accurate calibration ensuring compliance with national and international standards.",
    icon: Scale,
    highlights: [
      "Certified calibration",
      "On-site & lab service",
      "Fast turnaround",
    ],
    seoTitle: "Scale Calibration Services in Zambia",
    seoDescription:
      "Certified calibration services for retail, industrial, and laboratory scales.",
  },
  {
    id: 2,
    slug: "installation-setup",
    title: "Installation & Setup",
    description:
      "Professional installation of weighing equipment for optimal performance.",
    icon: Settings,
    highlights: [
      "Industrial & retail systems",
      "System configuration",
      "Operator training included",
    ],
    seoTitle: "Scale Installation & Setup Services",
  },
  {
    id: 3,
    slug: "maintenance-repairs",
    title: "Maintenance & Repairs",
    description:
      "Preventive maintenance and rapid repairs to minimize downtime.",
    icon: Wrench,
    highlights: [
      "Genuine spare parts",
      "Emergency breakdown support",
      "Service contracts available",
    ],
    seoTitle: "Scale Maintenance & Repair Services",
  },
  {
    id: 4,
    slug: "compliance-certification",
    title: "Compliance & Certification",
    description:
      "Ensuring your equipment meets regulatory and trade requirements.",
    icon: ShieldCheck,
    highlights: [
      "Trade-approved certification",
      "Audit & inspection support",
      "Regulatory documentation",
    ],
    seoTitle: "Weighing Equipment Compliance & Certification",
  },
];

export interface ServiceTier {
  name: string;
  price: string;
  recommended?: boolean;
  features: string[];
}

export interface ServiceDetail {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  relatedProductTags: string[];
  tiers: ServiceTier[];
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  /* -------------------------------------------------------
     Calibration Services
  ------------------------------------------------------- */
  {
    id: 1,
    slug: "calibration",
    title: "Calibration Services",
    description: "Certified calibration for accuracy and compliance.",
    longDescription:
      "Our calibration services ensure your weighing equipment delivers precise and reliable results while complying with national and international standards. We provide both on-site and laboratory calibration using certified reference weights, complete documentation, and traceable certificates accepted for trade and audit purposes.",
    image: "/products/retail-s4.png",
    relatedProductTags: ["retail", "lab", "industrial"],
    tiers: [
      {
        name: "Basic",
        price: "ZMW 1,200",
        features: [
          "Single weighing device",
          "Laboratory calibration",
          "Calibration certificate",
        ],
      },
      {
        name: "Professional",
        price: "ZMW 2,500",
        recommended: true,
        features: [
          "Up to 3 devices",
          "On-site calibration",
          "Certified documentation",
          "Priority scheduling",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Unlimited devices",
          "Multi-location service",
          "Annual calibration plan",
          "Dedicated account support",
        ],
      },
    ],
  },

  /* -------------------------------------------------------
     Installation & Setup
  ------------------------------------------------------- */
  {
    id: 2,
    slug: "installation-setup",
    title: "Installation & Setup",
    description: "Professional installation for optimal performance.",
    longDescription:
      "Our installation and setup service ensures your weighing equipment is installed correctly, configured for your specific use case, and ready for operation. We handle everything from mechanical installation to software configuration and operator training.",
    image: "/products/lab-s2.png",
    relatedProductTags: ["retail", "industrial", "truck-scale"],
    tiers: [
      {
        name: "Basic",
        price: "ZMW 1,800",
        features: [
          "Single device installation",
          "Basic configuration",
          "Operational testing",
        ],
      },
      {
        name: "Professional",
        price: "ZMW 3,500",
        recommended: true,
        features: [
          "Complex system installation",
          "Software configuration",
          "User training session",
          "Performance validation",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Large-scale installations",
          "Multi-device systems",
          "Integration with ERP / POS",
          "On-site commissioning",
        ],
      },
    ],
  },

  /* -------------------------------------------------------
     Maintenance & Repairs
  ------------------------------------------------------- */
  {
    id: 3,
    slug: "maintenance-repairs",
    title: "Maintenance & Repairs",
    description: "Preventive maintenance and rapid repairs.",
    longDescription:
      "We provide preventive maintenance and emergency repair services to keep your weighing systems operational and accurate. Our technicians use genuine spare parts and follow manufacturer-recommended procedures to reduce downtime and extend equipment lifespan.",
    image: "/products/retail-s3.png",
    relatedProductTags: ["industrial", "retail", "truck-scale"],
    tiers: [
      {
        name: "Basic",
        price: "ZMW 1,000",
        features: [
          "Single inspection visit",
          "Minor adjustments",
          "Performance report",
        ],
      },
      {
        name: "Professional",
        price: "ZMW 2,800",
        recommended: true,
        features: [
          "Preventive maintenance visit",
          "Parts replacement (basic)",
          "Emergency response support",
        ],
      },
      {
        name: "Enterprise",
        price: "Contract",
        features: [
          "Annual service contract",
          "Priority emergency response",
          "Genuine spare parts",
          "Scheduled maintenance visits",
        ],
      },
    ],
  },

  /* -------------------------------------------------------
     Compliance & Certification
  ------------------------------------------------------- */
  {
    id: 4,
    slug: "compliance-certification",
    title: "Compliance & Certification",
    description: "Regulatory compliance and trade certification.",
    longDescription:
      "Our compliance and certification service ensures your weighing equipment meets all regulatory, legal, and trade requirements. We support audits, inspections, and provide the necessary documentation required by authorities and industry regulators.",
    image: "/products/lab-s1.png",
    relatedProductTags: ["retail", "lab", "trade-approved"],
    tiers: [
      {
        name: "Basic",
        price: "ZMW 1,500",
        features: [
          "Compliance assessment",
          "Documentation review",
          "Certification guidance",
        ],
      },
      {
        name: "Professional",
        price: "ZMW 3,000",
        recommended: true,
        features: [
          "Trade approval support",
          "Audit preparation",
          "Regulatory documentation",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Multi-site compliance",
          "Regulatory liaison",
          "Ongoing certification support",
        ],
      },
    ],
  },
];

export type NewsCategory = "Press Release" | "News" | "Announcement";

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;          // Full article (HTML or MD)
  image: string;
  date: string;             // ISO date
  category: NewsCategory;

  /* --- Optional but powerful --- */
  author?: {
    name: string;
    role?: string;
  };
  tags?: string[];
  featured?: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
}

export const NEWS: NewsArticle[] = [
  {
    id: 1,
    slug: "new-calibration-lab-launch",
    title: "New Calibration Laboratory Launched in Lusaka",
    excerpt:
      "We have expanded our calibration capabilities with a new state-of-the-art laboratory facility in Lusaka.",
    content: `
      <p>We are proud to announce the official launch of our new calibration laboratory in Lusaka.</p>

      <p>This state-of-the-art facility significantly enhances our ability to deliver
      certified calibration services compliant with national and international standards.</p>

      <p>The laboratory is equipped with high-precision reference weights, advanced
      testing instruments, and is staffed by fully certified technicians.</p>

      <p>This investment reinforces our long-term commitment to accuracy, compliance,
      and service excellence across Zambia.</p>
    `,
    image: "/products/lab-s2.png",
    date: "2025-01-15",
    category: "Press Release",
    author: {
      name: "ActsCloud Media",
      role: "Corporate Communications",
    },
    tags: ["Calibration", "Laboratory", "Lusaka"],
    featured: true,
    seo: {
      title: "New Calibration Laboratory Launched in Lusaka | ActsCloud",
      description:
        "ActsCloud launches a state-of-the-art calibration laboratory in Lusaka to enhance certified weighing services.",
    },
  },

  {
    id: 2,
    slug: "industrial-weighbridge-installation",
    title: "Successful Industrial Weighbridge Installation Completed",
    excerpt:
      "Our engineering team completed a large-scale industrial weighbridge installation for a logistics partner.",
    content: `
      <p>Our engineering team has successfully completed the installation of a
      high-capacity industrial weighbridge for a major logistics operator.</p>

      <p>The project involved site preparation, system calibration, and operator training
      to ensure accurate and reliable performance from day one.</p>

      <p>This installation supports efficient cargo handling and compliance with
      trade measurement requirements.</p>
    `,
    image: "/products/retail-s2.png",
    date: "2024-12-20",
    category: "News",
    tags: ["Weighbridge", "Industrial", "Logistics"],
    seo: {
      title: "Industrial Weighbridge Installation Completed",
      description:
        "ActsCloud completes a large-scale industrial weighbridge installation for a logistics client.",
    },
  },

  {
    id: 3,
    slug: "service-expansion-announcement",
    title: "Service Coverage Expanded Across Zambia",
    excerpt:
      "We now provide calibration and maintenance services nationwide, strengthening our service reach.",
    content: `
      <p>We are pleased to announce the expansion of our service coverage across Zambia.</p>

      <p>Clients nationwide can now access certified calibration, preventive maintenance,
      and emergency repair services with faster response times.</p>

      <p>This expansion reflects our commitment to supporting industries wherever
      accurate measurement is critical.</p>
    `,
    image: "/products/retail-s5.png",
    date: "2024-11-02",
    category: "Announcement",
    tags: ["Nationwide", "Services", "Expansion"],
    seo: {
      title: "Nationwide Service Expansion Announcement",
      description:
        "Premier Scales expands calibration and maintenance services across Zambia.",
    },
  },
];
