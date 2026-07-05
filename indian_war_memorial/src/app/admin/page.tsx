import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  const stats = [
    { label: "Total Soldiers", value: "—", icon: "🪖", desc: "Connect MongoDB to see data" },
    { label: "Wars Documented", value: "—", icon: "⚔️", desc: "Connect MongoDB to see data" },
    { label: "Total Users", value: "—", icon: "👤", desc: "Connect MongoDB to see data" },
    { label: "Site Status", value: "Live", icon: "🟢", desc: "Application is running" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Admin Dashboard</h1>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Welcome back, {session?.user?.name}. Manage the Indian War Memorial content below.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-6 rounded-2xl border"
            style={{ background: "#131A0F", borderColor: "rgba(62,81,43,0.4)" }}
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <div className="text-2xl font-black text-white mb-1">{s.value}</div>
            <div className="text-sm font-semibold text-white mb-1">{s.label}</div>
            <div className="text-xs" style={{ color: "#6B7280" }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/admin/soldiers/new", label: "Add New Soldier", icon: "🪖", desc: "Add a brave soldier's profile to honor their sacrifice." },
            { href: "/admin/wars/new", label: "Add New War / Campaign", icon: "⚔️", desc: "Document a historic war or military campaign." },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="p-6 rounded-2xl border hover:border-[#C49F47]/40 transition-all duration-300 group"
              style={{ background: "#131A0F", borderColor: "rgba(62,81,43,0.4)" }}
            >
              <div className="text-2xl mb-3">{action.icon}</div>
              <div className="text-base font-bold text-white mb-1 group-hover:text-[#C49F47] transition-colors">{action.label}</div>
              <div className="text-sm" style={{ color: "#6B7280" }}>{action.desc}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Setup Instructions */}
      <div
        className="p-6 rounded-2xl border"
        style={{ background: "rgba(196,159,71,0.05)", borderColor: "rgba(196,159,71,0.3)" }}
      >
        <h3 className="text-sm font-bold mb-3" style={{ color: "#C49F47" }}>⚙️ Next Steps to Complete Setup</h3>
        <ol className="space-y-2 text-sm" style={{ color: "#9CA3AF" }}>
          <li>1. Fill in your <strong style={{ color: "#fff" }}>.env.local</strong> with MongoDB URI, Cloudinary keys, and Mailtrap credentials.</li>
          <li>2. Create your Admin user in MongoDB Atlas manually and set <strong style={{ color: "#fff" }}>role: "ADMIN"</strong>.</li>
          <li>3. Upload soldier images to Cloudinary and use the URLs when adding soldiers.</li>
          <li>4. Deploy to Vercel and add all env vars in Vercel Dashboard → Settings → Environment Variables.</li>
        </ol>
      </div>
    </div>
  );
}
