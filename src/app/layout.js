import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Kpop Chart - Portal Berita K-Pop Terkini",
  description: "Berita terbaru, review, dan update seputar dunia K-Pop.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        {/* children ini adalah isi dari page.js (halaman berita yang berubah-ubah) */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}