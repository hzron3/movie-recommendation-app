import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative group h-full">
            <Image
              src="/hero-section-image.jpg"
              alt="Contact Us"
              width={400}
              height={450}
              className="w-full h-full object-cover rounded-lg lg:rounded-l-lg"
            />
            <h1 className="absolute top-6 sm:top-10 left-4 sm:left-10 text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug  drop-shadow-lg">
              Contact us
            </h1>
            <div className="absolute bottom-4 sm:bottom-6 lg:bottom-10 w-full px-4 sm:px-10">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
                <a
                  href="tel:+254721920713"
                  className="flex items-center mb-4 sm:mb-6 text-gray-800 text-sm sm:text-base"
                >
                  <PhoneIcon className="h-6 w-6 sm:h-7 sm:w-7 text-sky-400" />
                  <span className="ml-3 sm:ml-4">+254721920713</span>
                </a>
                <a
                  href="mailto:info@savannahinformatics.com"
                  className="flex items-center mb-4 sm:mb-6 text-gray-800 text-sm sm:text-base"
                >
                  <EnvelopeIcon className="h-6 w-6 sm:h-7 sm:w-7 text-sky-400" />
                  <span className="ml-3 sm:ml-4">
                    info@savannahinformatics.com
                  </span>
                </a>
                <div className="flex items-center text-gray-800 text-sm sm:text-base">
                  <MapPinIcon className="h-6 w-6 sm:h-7 sm:w-7 text-sky-400" />
                  <span className="ml-3 sm:ml-4">
                    654 Utalii Street, Nairobi
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg">
            <h2 className="text-sky-400  text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug mb-6 sm:mb-10">
              Send Us A Message
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full h-10 sm:h-12 text-gray-700 placeholder-gray-400 rounded-lg border border-gray-200 px-3 sm:px-4 mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-10 sm:h-12 text-gray-700 placeholder-gray-400 rounded-lg border border-gray-200 px-3 sm:px-4 mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full h-10 sm:h-12 text-gray-700 placeholder-gray-400 rounded-lg border border-gray-200 px-3 sm:px-4 mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm sm:text-base"
            />

            <div className="mb-4 sm:mb-6">
              <h4 className="text-gray-500 text-sm sm:text-base mb-2">
                Preferred method of communication
              </h4>
              <div className="flex gap-4 sm:gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-gray-500 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="contact-method"
                    className="text-sky-400"
                  />
                  Email
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-500 text-sm sm:text-base">
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
              className="w-full h-20 sm:h-24 text-gray-700 placeholder-gray-400 rounded-lg border border-gray-200 px-3 sm:px-4 py-2 mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm sm:text-base"
            />

            <button className="w-full h-10 sm:h-12 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 transition duration-300 text-sm sm:text-base">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
