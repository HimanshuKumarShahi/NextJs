import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Providers from "@/components/Providers";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <Providers>
      <div className="min-h-screen" style={{ background: "#060A04" }}>
        {/* Admin top bar */}
        <div className="h-1 flex">
          <div className="flex-1" style={{ background: "#FF9933" }} />
          <div className="flex-1" style={{ background: "#FFFFFF" }} />
          <div className="flex-1" style={{ background: "#138808" }} />
        </div>
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 min-h-screen border-r flex-shrink-0" style={{ background: "#0B1006", borderColor: "rgba(62,81,43,0.4)" }}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "linear-gradient(135deg, #FF9933, #C49F47, #138808)" }}>
                  A
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Admin Panel</p>
                  <p className="text-xs" style={{ color: "#C49F47" }}>Indian War Memorial</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { href: "/admin", label: "Dashboard", icon: "📊" },
                  { href: "/admin/soldiers", label: "Manage Soldiers", icon: "🪖" },
                  { href: "/admin/soldiers/new", label: "Add Soldier", icon: "➕" },
                  { href: "/admin/wars", label: "Manage Wars", icon: "⚔️" },
                  { href: "/admin/wars/new", label: "Add War", icon: "➕" },
                  { href: "/", label: "← View Site", icon: "🌐" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white transition-all duration-150"
                    style={{ hover: { background: "rgba(62,81,43,0.3)" } }}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          {/* Main content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
