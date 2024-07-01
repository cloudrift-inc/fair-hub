import React, { useState } from "react";
import Image from "next/image";
import Button from "./foundational/Button";
import Link from "./foundational/Link";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': '6441e7b4a28cdc684ee4b438-u88LjqLhlOEsMXcYTezm1g8uenQT4zGULZ2Qe27IyoLok9YIh5'
      },
      body: JSON.stringify({
        customProperties: { message: formData.message },
        country: 'f',
        firstName: formData.name,
        tags: ['neuralrack'],
        identifiers: [
          {
            channels: { email: { status: 'nonSubscribed' } },
            type: 'email',
            id: formData.email
          }
        ]
      })
    };

    try {
      const response = await fetch('https://api.omnisend.com/v5/contacts', options);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setSuccessMessage('Message has been sent. We will contact you soon.');
        setErrorMessage(''); 
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setErrorMessage('Failed to send message. Please try again later.');
        setSuccessMessage(''); 
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage(''); 
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-linear-gradient text-white" id="contactus">
      <div className="flex flex-1 flex-col space-y-8 px-4 py-8 md:flex-row md:space-y-0">
        {/* Left Section */}
        <div className="flex flex-1 flex-col space-y-12 px-4 md:ml-24 lg:ml-[300px] md:items-start md:justify-center md:px-12">
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
        <div className="flex flex-1 items-center justify-center md:mr-20 md:px-12 md:pt-20">
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <h3 className="text-sm">Name</h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#18181B] p-3 text-white placeholder-gray-400 focus:outline-none"
              />
              <h3 className="text-sm">Email</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#18181B] p-3 text-white placeholder-gray-400 focus:outline-none"
              />
              <h3 className="text-sm">Message</h3>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="h-40 bg-[#18181B] p-3 text-white placeholder-gray-400 focus:outline-none"
              />
              <Button
                type="submit"
                className="w-full rounded bg-[#4770DB] py-3 text-white transition-colors duration-300 hover:bg-[#003bb3]"
              >
                Get in touch
              </Button>
              {successMessage && (
                <p className="text-green-600">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-600">{errorMessage}</p>
              )}
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
          src="/footer.png" 
          alt="Payment Options"
          width={1000} 
          height={50} 
          layout="intrinsic" 
        />
      </div>
    </div>
  );
};

export default Footer;
