"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <footer className="bg-white text-neutral-700 border-t">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Company Info */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 lg:col-span-1"
        >
          <p className="italic text-red-800 text-lg lg:text-1xl truncate">Scales - PremierZM</p>

          <p className="text-sm leading-relaxed text-neutral-600">
            Leading supplier of industrial, retail, and commercial weighing
            equipment in Zambia. Trusted for accuracy, durability, and
            compliance.
          </p>

          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            ZABS & ISO Certified Equipment
          </div>

          {/* Social Media */}
          <div className="flex gap-3 pt-2">
            <Link href="#" className="p-2 rounded-full border hover:bg-neutral-100 transition">
              <Facebook size={16} />
            </Link>
            <Link href="#" className="p-2 rounded-full border hover:bg-neutral-100 transition">
              <Linkedin size={16} />
            </Link>
            <Link href="#" className="p-2 rounded-full border hover:bg-neutral-100 transition">
              <Twitter size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <h4 className="footer-title">Products</h4>
          <ul className="footer-list">
            <li><Link href="#">Industrial Scales</Link></li>
            <li><Link href="#">Retail Scales</Link></li>
            <li><Link href="#">Laboratory Scales</Link></li>
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="footer-title">Services</h4>
          <ul className="footer-list">
            <li><Link href="#">Installation</Link></li>
            <li><Link href="#">Maintenance & Repairs</Link></li>
            <li><Link href="#">Technical Consultation</Link></li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <h4 className="footer-title">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin size={16} /> Lusaka, Zambia
            </li>
            <li className="flex gap-2">
              <Phone size={16} /> +260 970 785 901
            </li>
            <li className="flex gap-2">
              <Mail size={16} /> premier_scale@hotmail.com
            </li>
          </ul>
        </motion.div>

        {/* Newsletter / RFQ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <h4 className="footer-title">Request a Quote</h4>
          <p className="text-sm text-neutral-600 mb-3">
            Get pricing or product consultation.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <textarea
              placeholder="What do you need?"
              rows={3}
              className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button className="w-full bg-red-600 text-white text-sm py-2 rounded-md hover:bg-red-700 transition">
              Submit Request
            </button>
          </form>
        </motion.div>
      </div>

      {/* Certifications 
      <div className="border-t bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-wrap items-center justify-center gap-10">
          <span className="text-sm text-neutral-600 font-medium">
            Certified & Compliant
          </span>
          <img src="/certs/zabs.png" alt="ZABS" className="h-8 opacity-80" />
          <img src="/certs/iso.png" alt="ISO" className="h-8 opacity-80" />
          <img src="/certs/oiml.png" alt="OIML" className="h-8 opacity-80" />
        </div>
      </div> */}

      {/* Map 
      <div className="w-full h-72">
        <iframe
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Lusaka%20Zambia&output=embed"
        />
      </div>*/}

      {/* Bottom Bar */}
      <Separator />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Premier Scales Zambia</p>
        <div className="flex gap-6">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
