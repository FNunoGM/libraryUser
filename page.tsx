import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-black">
        <div className="container flex h-14 items-center">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 text-white"
          >
            <span className="text-lg font-bold">XPTO Library</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
            <Link
              href="/return"
              className="transition-colors hover:text-white/80 text-white"
            >
              Return Book
            </Link>
            <Link
              href="/search"
              className="transition-colors hover:text-white/80 text-white"
            >
              Search Books
            </Link>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Login
            </Button>
            <Button className="bg-white text-black hover:bg-white/90">
              Sign Up
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container flex flex-col items-center text-center max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              Welcome to XPTO Library
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-[700px]">
              Your gateway to knowledge and imagination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="bg-black text-white hover:bg-black/90">
                Explore Books
              </Button>
              <Button
                variant="outline"
                className="border-black hover:bg-black/5"
              >
                Request a Book
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
