import Providers from "@/components/Providers";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: "#060A04" }}>
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]" style={{ background: "radial-gradient(circle, #3E512B, transparent)" }} />
        {/* Tricolor line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1" style={{ background: "#FF9933" }} />
          <div className="flex-1" style={{ background: "#FFFFFF" }} />
          <div className="flex-1" style={{ background: "#138808" }} />
        </div>
        <div className="relative w-full max-w-md">
          {children}
        </div>
      </main>
    </Providers>
  );
}
