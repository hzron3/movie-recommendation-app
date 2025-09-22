"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-0">
        {/*Social Icons */}
        <ul className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
          <li>
            <Link href="#" className="block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-blue-600 w-6 h-6 sm:w-8 sm:h-8 hover:fill-blue-700 transition-colors"
                viewBox="0 0 49.652 49.652"
              >
                <path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" />
              </svg>
            </Link>
          </li>
          <li>
            <Link href="#" className="block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 sm:w-8 sm:h-8 hover:fill-blue-700 transition-colors"
                viewBox="0 0 112.196 112.196"
              >
                <circle cx="56.098" cy="56.097" r="56.098" fill="#007ab9" />
                <path
                  fill="#fff"
                  d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149zm-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967zm-6.791 59.77H41.27v-40.33H27.865v40.33z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link href="#" className="block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 sm:w-8 sm:h-8 hover:fill-gray-700 transition-colors"
                viewBox="0 0 1227 1227"
              >
                <path d="M613.5 0C274.685 0 0 274.685 0 613.5S274.685 1227 613.5 1227 1227 952.315 1227 613.5 952.315 0 613.5 0z" />
                <path
                  fill="#fff"
                  d="m680.617 557.98 262.632-305.288h-62.235L652.97 517.77 470.833 252.692H260.759l275.427 400.844-275.427 320.142h62.239l240.82-279.931 192.35 279.931h210.074L680.601 557.98zM345.423 299.545h95.595l440.024 629.411h-95.595z"
                />
              </svg>
            </Link>
          </li>
        </ul>

        {/*Copyright */}
        <p className="text-sm sm:text-base text-center text-gray-900 lg:text-center lg:flex-1">
          © 2025 Movie Recommendation App. All rights reserved.
        </p>

        {/*Footer Links */}
        <ul className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-8">
          <li>
            <Link
              href="#"
              className="text-gray-900 text-sm sm:text-base hover:text-[#25a1d6] transition-colors"
            >
              Terms of Service
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-900 text-sm sm:text-base hover:text-[#25a1d6] transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-900 text-sm sm:text-base hover:text-[#25a1d6] transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
