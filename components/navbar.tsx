"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { X, Search } from "lucide-react";
import { TbLoaderQuarter, TbMenu4 } from "react-icons/tb";
//import SignInButton from "./auth/SignInButton";
import { toast } from "sonner";
import NavSidebar from "./sidebar";
//import Image from "next/image";
import { Separator } from "./ui/separator";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [onSearch] = useState(false);

  const navItems = [
    { label: "Products", href: "/Products" },
    { label: "Market Sectors", href: "/Market-Sector" },
    { label: "About Us", href: "/About-Us" },
    { label: "News", href: "/News" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
   /* setOnSearch(true);

    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
      setMobileSearchOpen(false);
      setMobileOpen(false);
    }

    setOnSearch(false);*/
  };

  const handleMediaClick = () => {
    if (!session) {
      toast("You need to sign in first to submit media.");
    } else {
      router.push("/studio/dashboard");
      setMobileOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed top-0 w-full z-50 bg-white border-b border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
         {/* <Image
            src="/vercel.svg"
            alt="Premier-Scales"
            width={44}
            height={44}
            className="rounded-full object-cover"
          />*/} 
          <p className="italic text-red-800 text-lg lg:text-1xl truncate">Scales - PremierZM</p>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <button
              aria-label="toggle-search"
              onClick={() => setSearchOpen((prev) => !prev)}
              className="p-2 bg-red-600 text-white hover:bg-red-500 transition"
            >
              {onSearch ? <TbLoaderQuarter size={18} /> : <Search size={18} />}
            </button>

            <AnimatePresence>
              {searchOpen && (
                <motion.form
                  onSubmit={handleSearch}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 mt-2 w-96 bg-red-500 border border-gray-200 px-3 py-2 flex items-center gap-2 shadow-sm"
                >
                  <input
                    type="text"
                    placeholder="Search for products here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="flex-1 px-4 py-1 text-sm bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
                  />
                  <Button type="submit" size="sm" className="bg-white text-gray-800 hover:bg-white/90 hover:text-black">
                    Go
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-2 py-1 text-md font-light transition-colors ${
                    isActive
                      ? "text-red-600 after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="w-1 h-6 bg-red-500"/>
            <Separator orientation="vertical" className="w-1"/>
          </nav>
          
          {/*<SignInButton />*/}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            aria-label="toggle-mobile-search"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="p-2 bg-red-600 text-white hover:bg-red-500 transition"
          >
            {onSearch ? <TbLoaderQuarter size={18} /> : <Search size={18} />}
          </button>

          <button
            aria-label="Toggle Menu"
            className="p-2 text-gray-800"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <TbMenu4 className="w-6 h-6" />}
          </button>

          <Separator orientation="vertical" className="w-1"/>
          {/*<SignInButton />*/}
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.form
            onSubmit={handleSearch}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden px-4 py-2 bg-red-500 border-t border-white flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search for products here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="flex-1 px-4 py-1 text-sm w-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <Button type="submit" size="sm" className="bg-white text-gray-800 hover:bg-white/90 hover:text-black">
              Go
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setMobileOpen(false)}
            />

            <NavSidebar
              scrolled={true}
              navItems={navItems}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              handleMediaClick={handleMediaClick}
            />
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
