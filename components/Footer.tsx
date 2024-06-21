import React from "react";
import Image from "next/image";
import Button from "./foundational/Button";
import Link from "./foundational/Link";

const Footer = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-linear-gradient text-white" id="contactus">
      <div className="flex flex-1 flex-col space-y-8 px-4 py-8 md:flex-row md:space-y-0">
        {/* Left Section */}
        <div className="flex flex-1 flex-col space-y-12 px-4 md:ml-24 md:items-start md:justify-center md:px-12">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-[1.25] md:text-6xl">
              Let's Talk
            </h2>
            <p className="text-zinc-400">
              Proudly hosted in Research Triangle Park
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Email</h3>
            <p>support@neuralrack.ai</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Socials</h3>
            <p>
              <Link
                href="https://discord.gg/V4V6J8bM"
                className="text-white underline"
              >
                Discord
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-center md:px-12">
          <form className="w-full max-w-md space-y-4">
            <div className="flex flex-col space-y-4">
              <h3 className="text-sm">Name</h3>
              <input
                type="text"
                name="name"
                className="bg-[#18181B] p-3 text-white placeholder-gray-400 focus:outline-none"
              />
              <h3 className="text-sm">Email</h3>
              <input
                type="email"
                name="email"
                className="bg-[#18181B] p-3 text-white placeholder-gray-400 focus:outline-none"
              />
              <h3 className="text-sm">Message</h3>
              <textarea
                name="message"
                className="h-40 bg-[#18181B] p-3 text-white placeholder-gray-400 focus:outline-none"
              />
              <Button
                type="submit"
                className="w-full rounded bg-[#4770DB] py-3 text-white transition-colors duration-300 hover:bg-[#003bb3]"
              >
                Get in touch
              </Button>
              <div className="mt-8 text-center text-gray-400">
                Powered by FairCompute Platform
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="mx-auto my-8 h-[1px] w-3/5 rounded border-0 bg-gray-600 opacity-50" />
      {/* Payment Options Image */}
      <div className="flex w-full justify-center pb-8">
        <Image
          src="/footer.png" // Update this path as needed
          alt="Payment Options"
          width={1000} // Adjust the width as per your layout needs
          height={50} // Adjust the height as per your layout needs
          layout="intrinsic" // This will scale the image as per the width and height provided
        />
      </div>
    </div>
  );
};

export default Footer;
