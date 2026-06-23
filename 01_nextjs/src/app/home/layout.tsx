export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-black text-indigo-600 tracking-tighter">
          Home<span className="text-gray-900">Page</span>
        </div>
        <div className="hidden md:flex space-x-8 font-medium">
          <a
            href="#software"
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            Software
          </a>
          <a
            href="#gadgets"
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            Gear
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            Pricing
          </a>
        </div>
        <button className="bg-gray-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
          Login
        </button>
      </nav>
      {children}
    </>
  );
}
