"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./components/providers";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// export const metadata = {
//   title: "Movie Recommendation App",
//   icons: "/Movie Film Icon.png",
//   description: "Discover movies with TMDb",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname.startsWith("/login");

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          {!hideHeaderFooter && <Header />}
          {children}
          {!hideHeaderFooter && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
