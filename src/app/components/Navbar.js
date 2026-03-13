import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black tracking-tighter text-red-600">
              KPOP CHART
            </Link>
          </div>
          
          {/* Menu Kategori (Dummy sementara) */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Beranda</Link>
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">News</Link>
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Review</Link>
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Interview</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}