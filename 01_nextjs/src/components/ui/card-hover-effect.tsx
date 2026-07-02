import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    image: string;
    price: number;
    instructor: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>

            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>

            <div className="mt-5 flex justify-between items-center">
              <span className="text-sm text-white font-medium">
                By {item.instructor}
              </span>
              <span className="text-sm font-bold text-white bg-grey-900 border border-white px-10 py-3 rounded-sm">
                $ {item.price}
              </span>
            </div>

            <div className="mt-4 w-full">
              <div className="relative z-10 w-full px-4 py-2.5 bg-white dark:bg-white text-black text-center font-bold rounded-lg overflow-hidden group/btn transition-transform duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-green-600 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />

                <span className="relative z-20 flex items-center justify-center gap-2 text-sm">
                  Enroll Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm", // mt-8 ko mt-4 kiya thoda better spacing ke liye
        className,
      )}
    >
      {children}
    </p>
  );
};
