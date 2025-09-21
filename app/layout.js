import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie Recommendation App",
  icons: "/Movie Film Icon.png",
  description: "Discover movies with TMDb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
