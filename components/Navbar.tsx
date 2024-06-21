import Link from "./foundational/Link";
import Image from "next/image";
import "../app/globals.css";

const Navbar = () => {
  return (
    <header className="bg-black pb-4 pt-5">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/">
          <Image
            src="/logo.png"
            alt="NeuralRack Hosting Logo"
            width={200}
            height={200}
            className="shrink-0"
          />
          </Link>
        </div>
        <nav>
          <ul className="mt-4 flex flex-wrap space-x-0 md:mt-0 md:space-x-8">
            <li>
              <Link href="/#pricing">
                <span className="block px-4 py-2 font-nunito text-white hover:text-gray-300 md:inline md:py-0">
                  Pricing
                </span>
              </Link>
            </li>
            <li>
              <Link href="/#contactus">
                <span className="block px-4 py-2 font-nunito text-white hover:text-gray-300 md:inline md:py-0">
                  Contact
                </span>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <span className="block px-4 py-2 font-nunito text-white hover:text-gray-300 md:inline md:py-0">
                  Terms of Service
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="block px-4 py-2 font-nunito text-white hover:text-gray-300 md:inline md:py-0">
                  About Us
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        
      </div>
    </header>
  );
};

export default Navbar;
