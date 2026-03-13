export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-xl font-bold mb-4 tracking-wider">KPOP CHART</p>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Kpop Chart Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}