import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoricalTimeline from "@/components/HistoricalTimeline";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Historical Timeline",
  description: "A timeline of all major wars and battles fought by the Indian Armed Forces.",
};

export default function TimelinePage() {
  return (
    <Providers>
      <Navbar />
      <main className="flex-1 pt-20" style={{ background: "#0B1006" }}>
        <HistoricalTimeline />
      </main>
      <Footer />
    </Providers>
  );
}
