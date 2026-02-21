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
import Link from "next/link";

export function NavbarDemo() {
  const navItems = [
    { name: "Write", link: "/write" },
    { name: "Explore", link: "/browse" },
    { name: "Moments", link: "/moments" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap");
        .nav-logo { font-family: "Homemade Apple", cursive; }
      `}</style>

      <Navbar className={`top-0 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
        <NavBody className="hidden lg:flex items-center justify-between w-full max-w-6xl mx-auto px-8">
          <Link
            href="/"
            className="nav-logo text-xl text-[#0A1F3D] tracking-tight transition-opacity hover:opacity-60"
          >
            Heartune
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="text-[13px] font-semibold text-[#0A1F3D]/60 hover:text-[#0A1F3D] transition-colors duration-200 tracking-wide"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/support"
              className="px-4 py-2 bg-[#0A1F3D] text-white text-[12px] font-semibold rounded-lg hover:bg-[#1E3A5F] transition-all duration-300 shadow-sm"
            >
              Support
            </Link>
          </div>
        </NavBody>


        <MobileNav>
          <MobileNavHeader className="px-6 flex items-center justify-between">
            <Link
              href="/"
              className="nav-logo text-lg text-[#0A1F3D] transition-opacity hover:opacity-60"
            >
              Heartune
            </Link>

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
              <Link
                key={idx}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 py-3 text-[#0A1F3D] font-semibold hover:bg-[#F5F8FC] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="px-6 pt-2 pb-4">
              <Link
                href="/write"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 bg-[#0A1F3D] text-white text-sm font-semibold rounded-lg hover:bg-[#1E3A5F] transition-colors"
              >
                Send a Fess →
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>

      </Navbar>
    </>
  );
}