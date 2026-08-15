import Link from "next/link"

export default function Navbar() {
  return (
    <>
    <nav className="bg-gray-400 text-white p-4 flex gap-5 ">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/project">Project's</Link>
          <Link href="/classroom">Classroom</Link>
          <Link href="/project/web_devlopment">web_development</Link>
          <Link href="/project/python">Python</Link>
        </nav>
    </>
  )
}
