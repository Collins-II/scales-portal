"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

/* --------------------------------
   Route → Header Config
-------------------------------- */
const HEADER_CONFIG: Record<
  string,
  { image: string; subtitle?: string }
> = {
  "/market-sectors": {
    image: "/products/lab-s1.png",
    subtitle: "Solutions Across Key Industries",
  },
  "/services": {
    image: "/products/retail-s3.png",
    subtitle: "Professional Calibration & Support",
  },
  "/about-us": {
    image: "/products/lab-s2.png",
    subtitle: "Trusted Precision Since Day One",
  },
  "/news": {
    image: "/products/retail-s5.png",
    subtitle: "Latest Updates & Industry Insights",
  },
  "/products": {
    image: "/products/retail-s4.png",
    subtitle: "Precision Weighing Solutions",
  },
};

/* --------------------------------
   Helpers
-------------------------------- */
function formatSegment(seg: string) {
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SiteHeader() {
  const pathname = usePathname();
  const normalizedPath = pathname.toLowerCase();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map(formatSegment);

  const pageTitle =
    segments.length > 0
      ? segments[segments.length - 1]
      : "Precision Weighing Solutions";

  const headerConfig =
    HEADER_CONFIG[normalizedPath] ?? {
      image: "/products/retail-s5.png",
      subtitle: "Accurately Measuring Zambia",
    };

  return (
    <header className="relative w-full bg-neutral-200 h-[30vh] min-h-[260px] flex items-center text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={headerConfig.image}
          alt={pageTitle}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 md:px-10 flex flex-col gap-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-neutral-300">
          <Link
            href="/"
            className="hover:text-white transition font-medium"
          >
            Home
          </Link>

          {segments.map((seg, i) => (
            <span key={i} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4 text-neutral-400" />
              <span
                className={
                  i === segments.length - 1
                    ? "text-white font-semibold"
                    : "text-neutral-300"
                }
              >
                {seg}
              </span>
            </span>
          ))}
        </nav>

        {/* Title */}
        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {pageTitle}
          </h1>
          <p className="mt-2 text-base md:text-lg text-neutral-200 max-w-2xl">
            {headerConfig.subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}
