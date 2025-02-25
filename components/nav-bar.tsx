"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";

export function NavBar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black">
      <div className="container flex h-14 justify-self-center">
        <Link href="/" className="mr-6 flex items-center space-x-2 text-white">
          <span className="text-lg font-bold">XPTO Library</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
          <Link
            href="/explore"
            className="transition-colors hover:text-white/80 text-white"
          >
            Explore
          </Link>
          <Link
            href="/search"
            className="transition-colors hover:text-white/80 text-white"
          >
            Search
          </Link>
          {isLoggedIn && (
            <>
              <Link
                href="/return"
                className="transition-colors hover:text-white/80 text-white"
              >
                Return Book
              </Link>
              <Link
                href="/request"
                className="transition-colors hover:text-white/80 text-white"
              >
                Account
              </Link>
            </>
          )}
          {isLoggedIn ? (
            <Button
              onClick={logout}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-white text-black hover:bg-white/90" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
