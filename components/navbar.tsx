"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";

export function NavbarDemo() {
  const navItems = [
    { name: "Write", link: "#write" },
    { name: "Explore", link: "#explore" },
    { name: "Moments", link: "#moments" },
    { name: "How It Works", link: "#how-it-works" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      className={`
         top-0
        ${scrolled ? "py-2" : "py-4"}
      `}
    >
      {/* Desktop */}
      <NavBody className="hidden lg:flex">

        {/* Logo */}
        <span className="text-2xl font-bold text-[#1E3A5F] tracking-tight">
          Heartune
        </span>

        {/* Navigation */}
        <NavItems
          items={navItems}
          className="text-[#1E3A5F] font-semibold space-x-8"
        />

        {/* Optional right slot */}
        <div className="w-6" />
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader className="px-6 flex items-center justify-between">
          <span className="text-xl font-bold text-[#1E3A5F]">
            Heartune
          </span>

          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          
        >
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-6 py-3 text-[#1E3A5F] font-semibold hover:bg-gray-50 transition"
            >
              {item.name}
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}