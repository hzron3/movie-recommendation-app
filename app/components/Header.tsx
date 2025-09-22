"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "@/types";

export default function Header() {
  const { data: session } = useSession() as { data: { user: User } | null };
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="flex shadow-[0px_0px_16px_rgba(17,17,26,0.1)] py-4 px-4 sm:px-6 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto relative">
        {/* Logo */}
        <Link href="/" className="flex items-center z-10">
          <Image
            src="/Movie Film Logo.png"
            alt="MovieApp"
            width={96}
            height={96}
            className="hidden sm:block w-24 h-16 object-contain"
          />
          <Image
            src="/Movie Film Logo.png"
            alt="MovieApp"
            width={36}
            height={36}
            className="block sm:hidden w-9 h-9 object-contain"
          />
        </Link>

        {/* Desktop Menu (Centered) */}
        <ul className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-x-6 text-[#25a1d6] font-medium">
          <li>
            <Link href="/" className="hover:text-[#25a1d6]/80">
              Home
            </Link>
          </li>
          <li>
            <Link href="/movies" className="hover:text-[#25a1d6]/80">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:text-[#25a1d6]/80">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Login / Logout */}
        <div className="hidden lg:flex items-center gap-4 z-10">
          {!session ? (
            <Link
              href="/login"
              className="bg-[#25a1d6] hover:bg-[#1d88b3] px-4 py-2 rounded-md text-white font-medium"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="flex items-center text-[#25a1d6] font-medium gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
                Hi, {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-[#25a1d6] hover:bg-[#1d88b3] px-4 py-2 rounded-md text-white font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden z-10" onClick={toggleMenu}>
          <svg
            className="w-7 h-7 fill-[#25a1d6]"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-md overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[400px] p-6" : "max-h-0 p-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="/"
              className="text-[#25a1d6] font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/movies"
              className="text-[#25a1d6] font-medium"
              onClick={toggleMenu}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className="text-[#25a1d6] font-medium"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
          </li>
          {!session ? (
            <li>
              <Link
                href="/login"
                className="bg-[#25a1d6] hover:bg-[#1d88b3] px-4 py-2 rounded-md text-white font-medium"
                onClick={toggleMenu}
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {
                  signOut();
                  toggleMenu();
                }}
                className="bg-[#25a1d6] hover:bg-[#1d88b3] px-4 py-2 rounded-md text-white font-medium"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
