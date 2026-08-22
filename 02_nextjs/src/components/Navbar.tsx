import Link from "next/link"

export default function Navbar() {
  return (
    <>
     <nav className="bg-[#0f0f13] border-b border-slate-800/80 text-slate-300 px-6 py-4 flex flex-wrap gap-6 items-center justify-between sticky top-0 z-50 backdrop-blur-xl bg-opacity/80">
        <div className="flex gap-6 items-center font-medium text-sm">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/project" className="hover:text-white transition-colors">Project&apos;s</Link>
          <Link href="/classroom" className="hover:text-white transition-colors">Classroom</Link>
          <Link href="/project/web_devlopment" className="hover:text-white transition-colors">Web Development</Link>
          <Link href="/project/python" className="hover:text-white transition-colors">Python</Link>
        </div>
      
      </nav>

    </>
  )
}
