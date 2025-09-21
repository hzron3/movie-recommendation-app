import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          {/* Left Image & Info */}
          <div className="lg:mb-0 mb-10 relative group h-full">
            <Image
              src="/hero-section-image.jpg"
              alt="Contact Us"
              width={400}
              height={450}
              className="w-full h-full object-cover lg:rounded-l-lg rounded-lg"
            />
            <h1 className="absolute top-10 left-10 text-white text-4xl font-bold leading-snug font-manrope">
              Contact us
            </h1>
            <div className="absolute bottom-0 w-full lg:p-10 p-5">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <a
                  href="tel:4706011911"
                  className="flex items-center mb-6 text-gray-800"
                >
                  <PhoneIcon className="h-7 w-7 text-sky-400" />
                  <span className="ml-4">+254721920713</span>
                </a>
                <a
                  href="mailto:Pagedone1234@gmail.com"
                  className="flex items-center mb-6 text-gray-800"
                >
                  <EnvelopeIcon className="h-7 w-7 text-sky-400" />
                  <span className="ml-4">info@savannahinformatics.com</span>
                </a>
                <div className="flex items-center text-gray-800">
                  <MapPinIcon className="h-7 w-7 text-sky-400" />
                  <span className="ml-4">654 Utalii Street, Nairobi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-gray-50 p-8 lg:p-10 rounded-lg shadow-lg">
            <h2 className="text-sky-400 font-manrope text-3xl lg:text-4xl font-semibold leading-snug mb-10">
              Send Us A Message
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full h-12 text-gray-700 placeholder-gray-400 rounded-lg border border-gray-200 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-12 text-gray-700 placeholder-gray-400 rounded-lg border border-gray-200 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full h-12 text-gray-700 placeholder-gray-400 rounded-lg border border-gray-200 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <div className="mb-6">
              <h4 className="text-gray-500 text-lg mb-2">
                Preferred method of communication
              </h4>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-gray-500">
                  <input
                    type="radio"
                    name="contact-method"
                    className="text-sky-400"
                  />
                  Email
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-500">
                  <input
                    type="radio"
                    name="contact-method"
                    className="text-sky-400"
                  />
                  Phone
                </label>
              </div>
            </div>

            <textarea
              placeholder="Message"
              className="w-full h-24 text-gray-700 placeholder-gray-400 rounded-lg border border-gray-200 px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <button className="w-full h-12 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 transition duration-300">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
